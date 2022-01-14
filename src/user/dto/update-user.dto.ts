import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  name: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  nickname: string;
  @IsString()
  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  imageUrl: string;
  @IsString()
  @ApiProperty()
  @IsOptional()
  @Length(8, 16)
  password: string;
}
