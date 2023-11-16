import {
   Controller,
   Get,
   Patch,
   UseGuards,
   Body,
   UploadedFile,
   Post,
   UseInterceptors,
   ParseFilePipe,
   MaxFileSizeValidator,
   FileTypeValidator,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtGuard } from '../auth/custom-guard';
import { GetUser } from '../auth/decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// @UseGuards(JwtGuard)
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

   @Post('uploadAvatar')
   @UseInterceptors(FileInterceptor('file'))
   uploadAvatar(
      @GetUser('id') userId: number,
      @UploadedFile(
         new ParseFilePipe({
            validators: [
               // new MaxFileSizeValidator({ maxSize: 2000 }),
               new FileTypeValidator({ fileType: /image\/(jpeg|png)/ }),
            ],
         }),
      )
      file: Express.Multer.File,
   ) {
      return this.userService.uploadAvatar(userId, file);
   }
}
