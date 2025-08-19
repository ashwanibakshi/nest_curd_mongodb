/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { userCredDto } from 'src/user/dto/user.dto';
import { UserCreds } from 'src/user/schema/userdetail.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async Register(user: userCredDto): Promise<any> {
    return this.userService.registerUser(user);
  }

  async Login(email: string, password: string): Promise<UserCreds> {
    return await this.userService.checkUser(email, password);
  }
}
