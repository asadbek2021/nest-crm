import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';

import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel() private knex: Knex) {}
  async getProjectsByOrganization(orgId: string) {
    const projects = await this.knex.table('projects').where('org_id', orgId);
    return projects;
  }

  async getAllProjects() {
    const projects = await this.knex.table('projects').select('*');
    return projects;
  }

  async createProject(createProjectDto: CreateProjectDto) {
    const project = await this.knex
      .table('projects')
      .insert(createProjectDto)
      .returning('id');
    return project;
  }

  async updateProject(id: string, { orgId }: UpdateProjectDto) {
    const project = await this.knex
      .table('projects')
      .where('id', id)
      .update({ orgId });
    return project;
  }

  async deleteProject(id: string) {
    if (!id) {
      throw new NotFoundException(`Project ${id} does not exist`);
    }
    await this.knex.table('projects').where('id', id).del();
  }
}
