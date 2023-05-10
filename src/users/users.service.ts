import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

import { CreateUserDto, UserRoles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private knex: Knex) {}

  async getUsers() {
    const users = await this.knex.from('users').select('*');
    return users;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.role === UserRoles.Admin) {
        throw new Error('Admin could be created only once');
      }
      const user = await this.knex
        .from('users')
        .insert({
          name: createUserDto.name,
          role: createUserDto.role,
          created_by: createUserDto.createdBy,
        })
        .returning('id');
      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, { name, role }: UpdateUserDto) {
    try {
      const users = await this.knex
        .table('users')
        .where('id', id)
        .update({
          name,
          role,
        })
        .returning('id');

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    if (!id) {
      throw new NotFoundException(`User ${id} does not exist`);
    }
    const users = await this.knex.table('users').where('id', id).del();
    return { users };
  }
}
