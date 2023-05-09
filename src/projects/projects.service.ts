import { Injectable } from '@nestjs/common';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  async getProjects(query: { [key: string]: any }) {
    return [];
  }

  async createProject(createProjectDto: CreateProjectDto) {
    return {};
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    return {};
  }

  async deleteProject(id: string) {
    return {};
  }
}
