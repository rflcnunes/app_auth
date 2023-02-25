import { Injectable, OnModuleDestroy } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitmqService implements OnModuleDestroy {
  private client: ClientProxy;

  async sendMessage(queue: string, message: any): Promise<any> {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: queue,
      },
    });

    await this.client.connect();

    try {
      await this.client.emit('message', message).toPromise();
      console.log(`Sent message to queue "${queue}":`, message);
    } catch (error) {
      console.error(`Failed to send message to queue "${queue}":`, error);
    } finally {
      await this.client.close();
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
    }
  }
}
