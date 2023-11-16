import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Headers } from '@nestjs/common';

import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './custom-guard';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @Post('signup')
   signup(@Body() dto: AuthDto) {
      return this.authService.signup(dto);
   }

   @HttpCode(HttpStatus.OK)
   @Post('signin')
   signin(@Body() dto: AuthDto) {
      return this.authService.signin(dto);
   }

   @UseGuards(JwtGuard)
   @Get('refresh')
   refreshAccessToken(@Headers('Authorization') bearerToken: string) {
      return this.authService.refreshAccessToken(bearerToken);
   }
}
