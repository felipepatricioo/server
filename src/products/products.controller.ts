import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateManyDto } from './dto/create-manyproducts.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new product.',
  })
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @Post('/create-many')
  @ApiOperation({
    summary: 'Creates many new products.',
  })
  createMany(@Body() data: CreateManyDto): Promise<any[]> {
    return this.productsService.createMany(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all products',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a specific product by id.',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Updates a product.',
  })
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Deletes a product.',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
