import { UserRoles } from 'src/users';

export class CreateOrganizationDto {
  id: string;
  name: string;
  createdBy: string;
}

export class OrganizationUserDto {
  id: string;
  user_id: string;
  org_id: string;
  role: UserRoles;
}
