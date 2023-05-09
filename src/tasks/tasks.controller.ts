import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasksByWorker() {
    return [];
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return { createTaskDto };
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(id, updateProjectDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
