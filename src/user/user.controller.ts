/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Post('add')
  async addUser(@Body() user: userDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  async updateUser(@Param('id') id: string, @Body() user: userDto) {
    return this.userService.updateUser(id, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
