import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get(':organizationId')
  async getProjectsByOrganization(@Param('organizationId') id: string) {
    return { id };
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return { createProjectDto };
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
