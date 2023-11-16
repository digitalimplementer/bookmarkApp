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
      console.log('FILE', file.path);
      const user = await this.prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            avatar: file.path,
         },
      });

      delete user.hash;
      return file.path;
   }
}
