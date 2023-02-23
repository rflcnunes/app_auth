import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, Matches } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(RegExHelper.password)
  password: string;
}
