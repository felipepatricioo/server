import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  nickname: string;
  @IsString()
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  birthdate: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  imageUrl: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 16)
  password: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  passwordConfirmation: string;
}
