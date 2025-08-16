/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { userDto, userCredDto } from './dto/user.dto';
import { UserCreds, UserCredsDocument } from './schema/userdetail.schema';

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
  async checkUser(email: string, password: string) {
    try {
      console.log('email', email);
      const user = await this.userCredsModel.findOne({ email });
      if (user != null || user != undefined) {
        if (user.password === password) {
          return user;
        } else {
          return 'wrong credentials';
        }
      } else {
        return 'user not found';
      }
    } catch (error) {
      return error.message;
    }
  }
  async registerUser(user: userCredDto): Promise<UserCreds> {
    const newUser = await new this.userCredsModel(user);
    return newUser.save();
  }
}
