import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async getUsers(query: { [key: string]: any }) {
    return [];
  }

  async createUser(createUserDto: CreateUserDto) {
    return {};
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return {};
  }

  async deleteUser(id: string) {
    return {};
  }
}
