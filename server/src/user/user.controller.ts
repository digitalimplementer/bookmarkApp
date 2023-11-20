import {
   Controller,
   Get,
   Patch,
   UseGuards,
   Body,
   UploadedFile,
   Post,
   UseInterceptors,
   ParseFilePipeBuilder,
   HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

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
            destination: './uploadedFiles/avatars',
            filename(_, file, callback) {
               const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
               const extension = path.extname(file.originalname);
               const fileName = `${uniqueSuffix}-${file.originalname}`;
               callback(null, fileName);
            },
         }),
      }),
   )
   uploadAvatar(
      @GetUser('id') userId: number,
      @UploadedFile(
         new ParseFilePipeBuilder()
            .addFileTypeValidator({
               fileType: /image\/(jpeg|png)/,
            })
            .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
      )
      file: Express.Multer.File,
   ) {
      return this.userService.uploadAvatar(userId, file);
   }
}
