import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { UserRoles } from 'src/users';

@Injectable()
export class OrganizationsService {
  constructor(@InjectModel() private knex: Knex) {}

  async getOrganizations() {
    const organizations = await this.knex.from('organizations').select('*');
    return organizations;
  }

  async getOrganizationById(id: string) {
    const organization = await this.knex.from('organizations').where('id', id);
    return organization;
  }

  async createOrganization({ name, createdBy }: CreateOrganizationDto) {
    const org = await this.knex
      .table('organizations')
      .insert({ name, created_by: createdBy })
      .returning('id');
    return org;
  }

  async addUserToOrganization(userId: string, orgId: string, role: UserRoles) {
    try {
      if (!userId || !orgId || !role || role === UserRoles.Admin) {
        throw new Error(
          'Organization or User data was not provided or invalid',
        );
      }
      await this.knex.table('users').where('id', userId).update({ role });
      await this.knex
        .table('organizationUsers')
        .insert({ user_id: userId, org_id: orgId });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrganizationUsers(orgId: string) {
    const users = await this.knex('organizationUsers')
      .where('org_id', orgId)
      .join('users', 'organizationUsers.user_id', 'users.id');
    return users;
  }

  async updateOrganization(id: string, { name }: UpdateOrganizationDto) {
    const organization = await this.knex
      .table('organizations')
      .where('id', id)
      .update({ name });
    return organization;
  }

  async deleteOrganization(id: string) {
    if (!id) {
      throw new NotFoundException(`Organization ${id} does not exist`);
    }
    await this.knex.table('organizations').where('id', id).del();
  }
}
