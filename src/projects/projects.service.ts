import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  async getProjects(query: { [key: string]: any }) {
    return [];
  }
}
