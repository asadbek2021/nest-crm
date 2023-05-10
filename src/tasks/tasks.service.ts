import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class TasksService {
  constructor(@InjectModel() private knex: Knex) {}
  async getTasks() {
    const tasks = await this.knex.from('tasks').select('*');
    return tasks;
  }

  async getTaskById(id: string) {
    if (!id) {
      throw new NotFoundException(`Task ${id} does not exist`);
    }
    const task = await this.knex.from('tasks').where('id', id);
    return task;
  }

  async getTasksByProject(projectId: string) {
    const tasks = await this.knex.from('tasks').where('project_id', projectId);
    return tasks;
  }

  async getWorkerTasks(userId: string) {
    const tasks = await this.knex.from('tasks').where('worker_user_id', userId);
    return tasks;
  }

  async getWorkerTasksByStatus(userId: string, status: TaskStatus) {
    const tasks = await this.knex.from('tasks').where({
      worker_user_id: userId,
      status,
    });
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { createdBy, projectId, dueDate, workerUserId, status, doneAt } =
      createTaskDto;
    const task = await this.knex
      .from('tasks')
      .insert({
        created_by: createdBy,
        project_id: projectId,
        due_date: dueDate,
        worker_user_id: workerUserId,
        status,
        done_at: doneAt,
      })
      .returning('id');
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    if (!id) {
      throw new NotFoundException(`Task ${id} does not exist`);
    }
    const { projectId, dueDate, workerUserId, status, doneAt } = updateTaskDto;
    const task = await this.knex
      .table('tasks')
      .where('id', id)
      .update({
        project_id: projectId,
        due_date: dueDate,
        worker_user_id: workerUserId,
        status,
        done_at: doneAt,
      })
      .returning('id');
    return task;
  }

  async deleteTask(id: string) {
    if (!id) {
      throw new NotFoundException(`Task ${id} does not exist`);
    }
    await this.knex.table('tasks').where('id', id).del();
  }
}
