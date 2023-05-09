import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return [];
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return { createUserDto };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateProjectDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
