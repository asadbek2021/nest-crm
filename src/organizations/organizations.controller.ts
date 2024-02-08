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

import {
  CreateOrganizationDto,
  OrganizationUserDto,
} from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private orgService: OrganizationsService) {}
  @Get()
  getOrganizations() {
    return this.orgService.getOrganizations();
  }

  @Get(':id')
  getOrganizationById(@Param('id') id: string) {
    return this.orgService.getOrganizationById(id);
  }

  @Get(':id/users')
  getOrganizationUsers(@Param('id') id: string) {
    return this.orgService.getOrganizationUsers(id);
  }

  @Post()
  createOrganization(@Body() createOrgDto: CreateOrganizationDto) {
    return this.orgService.createOrganization(createOrgDto);
  }

  @Post('/user')
  addUserToOrganization(
    @Body() { org_id, user_id, role }: OrganizationUserDto,
  ) {
    return this.orgService.addUserToOrganization(user_id, org_id, role);
  }

  @Put(':id')
  updateOrganization(
    @Param('id') id: string,
    @Body() updateOrgDto: UpdateOrganizationDto,
  ) {
    return this.orgService.updateOrganization(id, updateOrgDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOrganization(@Param('id') id: string) {
    return this.orgService.deleteOrganization(id);
  }
}
