import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/usertesting'),
    UserModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
