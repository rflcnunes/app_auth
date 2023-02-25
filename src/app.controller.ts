import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './app/auth/auth.service';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { RabbitmqService } from './microservices/rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check/authenticated')
  async checkToken(@Request() req) {
    const user = await this.authService.getUserFromToken(
      req.headers.authorization,
    );
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check/token/:token')
  async getUserFromToken(@Param('token') token: string): Promise<User> {
    return this.authService.getUserFromToken(token);
  }

  @Get('send')
  async sendMessage(): Promise<string> {
    const message = await this.rabbitmqService.sendMessage(
      'Hello from RabbitMQ!',
    );
    console.log('Message sent', message);
    return 'Message sent';
  }
}
