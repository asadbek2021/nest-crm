import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organizations')
export class OrganizationsController {
  @Get()
  getOrganizations() {
    return [];
  }

  @Post()
  createOrganization(@Body() createOrgDto: CreateOrganizationDto) {
    return { createOrgDto };
  }

  @Put(':id')
  updateOrganization(
    @Param('id') id: string,
    @Body() updateOrgDto: UpdateOrganizationDto,
  ) {
    return { updateOrgDto };
  }

  @Delete(':id')
  deleteOrganization(@Param('id') id: string) {
    return {};
  }
}
