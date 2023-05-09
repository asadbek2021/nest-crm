import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
  getOrganizations() {
    return [];
  }

  createOrganization(orgDto: CreateOrganizationDto) {
    return {};
  }

  updateOrganization(id: string) {
    return [];
  }

  deleteOrganization(id: string) {
    return {};
  }
}
