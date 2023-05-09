import { Controller, Get, Param } from '@nestjs/common';

import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get(':organizationId')
  getProjectsByOrganization(@Param('organizationId') id: string) {
    return { id };
  }
}
