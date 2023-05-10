import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  getAllTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Get('/worker/:id')
  getWorkerTasks(@Param('id') id: string) {
    return this.taskService.getWorkerTasks(id);
  }

  @Get('/project/:id')
  getTasksByProject(@Param('id') id: string) {
    return this.taskService.getTasksByProject(id);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
