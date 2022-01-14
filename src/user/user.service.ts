import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const emailOrNicknameExists = await this.database.user.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            nickname: data.nickname,
          },
        ],
      },
    });

    if (emailOrNicknameExists) {
      throw new ConflictException('E-mail or nickname already registered!');
    }

    if (data.password !== data.passwordConfirmation) {
      throw new ConflictException('Password does not match');
    }

    delete data.passwordConfirmation;

    const saltRounds = 10;
    const passHash = await bcrypt.hash(data.password, saltRounds);

    const user = await this.database.user.create({
      data: {
        ...data,
        password: passHash,
      },
    });

    delete user.password;
    return user;
  }

  async findAll(): Promise<any[]> {
    const users = await this.database.user.findMany();
    const userNoPassword = users.map(({ password, ...rest }) => rest);
    return userNoPassword;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    delete user.password;
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.database.user.update({
      where: { id: id },
      data: data,
    });

    delete user.password;
    return user;
  }

  async remove(id: string) {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    } else {
      await this.database.user.delete({
        where: { id },
      });
    }
    return { message: 'User Successfully removed!' };
  }

  async addProduct(user: User, productId: string) {
    const product = await this.database.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    const userProduct = await this.database.user.findUnique({
      where: { id: user.id },
      include: {
        products: true,
      },
    });

    const userShopCart = userProduct.products;
    let foundProduct = false;

    userShopCart.map((game) => {
      if (game.id === productId) {
        foundProduct = true;
      }
    });

    if (foundProduct) {
      await this.database.user.update({
        where: { id: user.id },
        data: {
          products: {
            disconnect: {
              id: product.id,
            },
          },
        },
      });
      return {
        message: 'Product removed from your shopping cart successfully!',
      };
    } else {
      await this.database.user.update({
        where: { id: user.id },
        data: {
          products: {
            connect: {
              id: product.id,
            },
          },
        },
      });
      return {
        message: 'Product added to your shopping cart successfully!',
      };
    }
  }

  async userCart(userId: string) {
    const products = await this.database.user.findUnique({
      where: { id: userId },
      include: {
        products: true,
      },
    });
    return products;
  }
}
