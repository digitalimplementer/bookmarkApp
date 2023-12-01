import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
   constructor(private prisma: PrismaService) {}

   async editUser(userId: number, dto: EditUserDto) {
      const updatedUser = await this.prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            ...dto,
         },
      });

      delete updatedUser.hash;
      return updatedUser;
   }

   async uploadAvatar(userId: number, file: Express.Multer.File) {
      const user = await this.prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            avatar: `${file.originalname}`,
         },
      });
      delete user.hash;
      return {
         msg: 'File was uploaded',
      };
   }

   async getAvatar(userId: number) {
      const user = await this.prisma.user.findFirst({
         where: {
            id: userId,
         },
      });

      delete user.hash;
      return {
         path: user.avatar,
      };
   }

   async removeAvatar(userId: number) {
      const user = await this.prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            avatar: '',
         },
      });

      delete user.hash;
   }
}
