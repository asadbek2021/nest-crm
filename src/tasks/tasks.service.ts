import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  async getTasks(query: { [key: string]: any }) {
    return [];
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return {};
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return {};
  }

  async deleteTask(id: string) {
    return {};
  }
}
