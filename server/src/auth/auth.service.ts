import {
   ForbiddenException,
   Injectable,
   InternalServerErrorException,
   UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
   constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private config: ConfigService,
   ) {}

   async signup(dto: AuthDto) {
      const { email, password, firstName, lastName } = dto;
      // generate hash password
      const hash = await argon.hash(password);

      try {
         const newUser = await this.prisma.user.create({
            data: {
               email,
               firstName,
               lastName,
               hash,
            },
            // select: {
            //    id: true,
            //    email: true,
            //    createdAt: true,
            //    hash: false,
            // },
         });
         delete newUser.hash;
         return newUser;
      } catch (error) {
         if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
               throw new ForbiddenException('Credentials taken');
            }
         }
         throw error;
      }
   }

   async signin(dto: AuthDto) {
      const { email, password } = dto;

      const user = await this.prisma.user.findUnique({
         where: {
            email,
         },
      });
      if (!user) {
         throw new ForbiddenException('Credentials incorrect');
      }

      // compare passwords
      const pwMatches = await argon.verify(user.hash, password);
      if (!pwMatches) {
         throw new ForbiddenException('Credentials incorrect');
      }
      delete user.hash;
      const userData = {
         email: user.email,
         id: user.id,
      };

      const accessToken = await this.signToken(user.id, user.email);
      const refreshToken = await this.signToken(user.id, user.email);

      return { ...userData, ...accessToken, ...refreshToken };
   }

   async signToken(userId: number, email: string): Promise<{ accessToken: string; refreshToken: string }> {
      const payload = {
         sub: userId,
         email,
      };
      const secret = this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(payload, {
         expiresIn: '1d',
         secret,
      });

      const refreshToken = await this.jwt.signAsync(payload, {
         expiresIn: '30d',
         secret,
      });

      return {
         accessToken: token,
         refreshToken,
      };
   }

   async refreshAccessToken(bearerToken: string) {
      const [type, refreshToken] = bearerToken.split(' ') ?? '';

      if (type !== 'Bearer' || !refreshToken) {
         throw new UnauthorizedException('Invalid refresh token');
      }

      try {
         const secret = this.config.get('JWT_SECRET');
         if (!secret) {
            throw new InternalServerErrorException('JWT secret not configured');
         }

         const decoded = await this.jwt.verifyAsync(refreshToken, { secret });
         if (!decoded || typeof decoded !== 'object') {
            throw new UnauthorizedException('Invalid refresh token');
         }

         const { sub, email } = decoded;
         const newAccessToken = await this.jwt.signAsync(
            { sub, email },
            {
               expiresIn: '1d',
               secret,
            },
         );
         return {
            newAccessToken,
         };
      } catch (error) {
         if (error instanceof UnauthorizedException) {
            throw new UnauthorizedException(error.message);
         } else if (error instanceof InternalServerErrorException) {
            throw new InternalServerErrorException(error.message);
         } else {
            throw new InternalServerErrorException('Internal server error during token update');
         }
      }
   }
}
