import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ProductsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
