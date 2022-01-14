import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../auth/auth-userdecorator';
import { User } from '@prisma/client';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Create a new user.',
  })
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Post('users')
  @ApiOperation({
    summary: 'View all the users already registered.',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  @ApiOperation({
    summary: 'Get a specific user by id.',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Update a specific user by id.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Delete a specific user by id.',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard())
  @Patch('addProduct/:id')
  @ApiOperation({
    summary: 'Adds a Product to the shopping cart',
  })
  @ApiBearerAuth()
  addList(@AuthUser() user: User, @Param('id') productId: string) {
    return this.userService.addProduct(user, productId);
  }

  @UseGuards(AuthGuard())
  @Get('userCart')
  @ApiOperation({
    summary: "View all the products in the user's shopping cart",
  })
  @ApiBearerAuth()
  userCart(@AuthUser() user: User) {
    return this.userService.userCart(user.id);
  }
}
