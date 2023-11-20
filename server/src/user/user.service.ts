import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
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
      console.log('F', file);
      console.log('PA', file.path);
      // const fileExtension = path.extname(file.originalname);
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // const newFilePath = `${file.path}-${uniqueSuffix}${fileExtension}`;
      // await fs.promises.rename(file.path, newFilePath);
      const user = await this.prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            avatar: file.path,
         },
      });
      delete user.hash;
      return {
         path: file.path,
      };
   }
}
