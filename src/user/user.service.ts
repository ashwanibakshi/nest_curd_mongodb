/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { userDto, userCredDto } from './dto/user.dto';
import { UserCreds, UserCredsDocument } from './schema/userdetail.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserCreds.name)
    private userCredsModel: Model<UserCredsDocument>,
  ) {}

  async createUser(user: userDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (error) {
      return error.message;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      return error.message;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  async updateUser(id: string, user: userDto): Promise<User> {
    try {
      console.log('updating with id:', id, user);
      const updatedUser = this.userModel.findByIdAndUpdate(id, user, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      return error.message;
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      return error.message;
    }
  }
  async checkUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userCredsModel.findOne({ email });
      if (user != null || user != undefined) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (isMatch) {
          return 'creds matched';
        } else if (!isMatch) {
          return 'wrong creds';
        }
      } else {
        return 'user doesnt exist';
      }
    } catch (error) {
      return error.message;
    }
  }
  async registerUser(user: userCredDto): Promise<UserCreds> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      const newUser = new this.userCredsModel({
        ...user,
        password: hashedPassword,
      });
      return newUser.save();
    } catch (error) {
      return error.message;
    }
  }
}
