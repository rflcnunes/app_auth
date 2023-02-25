import { Injectable } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Client } from 'amqplib';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async sendMessage(message: string) {
    return this.client.emit('message', message);
  }

  @MessagePattern('message')
  async getMessage(message: string): Promise<string> {
    console.log('Message received', message);
    return message;
  }
}
