import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from '@prisma/client';
import { CreateManyDto } from './dto/create-manyproducts.dto';

@Injectable()
export class ProductsService {
  constructor(private database: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.database.product.create({
      data: data,
    });

    return product;
  }

  async createMany(data: CreateManyDto): Promise<any[]> {
    const createdProducts = [];

    data.products.map(async (product) => {
      const productExists = await this.findPerName(product.name);

      if (!productExists) {
        const created = await this.create(product);
        createdProducts.push(created);
      }
    });

    return createdProducts;
  }

  async findPerName(name: string) {
    const product = await this.database.product.findFirst({
      where: { name: name },
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.database.product.findMany();

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.database.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException({
        message: 'Product not found!',
      });
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    const product = await this.database.product.update({
      where: { id: id },
      data: data,
    });

    return { data: product, message: 'Product updated successfully' };
  }

  async remove(id: string) {
    const product = await this.database.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException({ message: 'Product not found!' });
    } else {
      await this.database.product.delete({
        where: { id: id },
      });
    }

    return { message: 'Product sucessfully deleted' };
  }
}
