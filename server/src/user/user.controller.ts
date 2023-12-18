import { Controller, Get, Patch, UseGuards, Body, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { JwtGuard } from '../auth/custom-guard';
import { GetUser } from '../auth/decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
   constructor(private userService: UserService) {}
   @Get('me')
   getMe(@GetUser() user: User) {
      return user;
   }

   @Patch('update')
   editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
      return this.userService.editUser(userId, dto);
   }

   @Post('upload')
   @UseInterceptors(
      FileInterceptor('file', {
         storage: diskStorage({
            destination: './public',
            filename(req, file, callback) {
               callback(null, file.originalname);
            },
         }),
      }),
   )
   uploadAvatar(
      @GetUser('id') userId: number,
      @UploadedFile()
      file: Express.Multer.File,
   ) {
      return this.userService.uploadAvatar(userId, file);
   }

   @Get('getAvatar')
   getAvatar(@GetUser('id') userId: number) {
      return this.userService.getAvatar(userId);
   }

   @Post('removeAvatar')
   removeAvatar(@GetUser('id') userId: number) {
      return this.userService.removeAvatar(userId);
   }
}
