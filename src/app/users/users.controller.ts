import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RabbitmqService } from '../../microservices/rabbitmq/rabbitmq.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    this.rabbitmqService.sendMessage('audit', {
      message: 'Find all users',
      data: {
        method: 'GET',
        path: '/users',
      },
      action: 'findAll',
    });
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.rabbitmqService.sendMessage('audit', {
      message: 'Find one user',
      data: {
        method: 'GET',
        path: '/users/:id',
        userId: id,
      },
      action: 'findOne',
    });
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.rabbitmqService.sendMessage('audit', {
      message: 'Update user',
      data: {
        method: 'Patch',
        path: '/users/:id',
        userId: id,
        newValues: updateUserDto,
      },
      action: 'Update user',
    });
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.rabbitmqService.sendMessage('audit', {
      message: 'Delete user',
      data: {
        method: 'Delete',
        path: '/users/:id',
        userId: id,
      },
      action: 'Delete user',
    });
    return this.usersService.remove(id);
  }
}
