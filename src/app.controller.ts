import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './app/auth/auth.service';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check/token')
  async checkToken(@Request() req) {
    const user = await this.authService.getUserFromToken(
      req.headers.authorization,
    );
    return user;
  }
}
