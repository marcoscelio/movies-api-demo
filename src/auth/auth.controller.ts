import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../users/dtos/usersDto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
  

//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
}
