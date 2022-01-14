import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, AuthResponse } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const hashValid = await bcrypt.compare(data.password, user.password);

    if (!hashValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    delete user.password;

    return {
      token: this.jwt.sign({ email: data.email }),
      user,
    };
  }
}
