import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateManyDto {
  @ApiProperty()
  @IsString()
  products: CreateProductDto[];
}
