import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from './dto/login.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthUser } from './auth-userdecorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login a user and generate a token',
  })
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  @ApiOperation({
    summary: 'Pegar o usuário logado no momento',
  })
  @ApiBearerAuth()
  profile(@AuthUser() user: User) {
    return user;
  }
}
