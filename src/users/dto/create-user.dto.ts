export class CreateUserDto {
  id: string;
  name: string;
  role: UserRoles;
  createdBy: string;
}

export const enum UserRoles {
  Admin = 'Admin',
  OrgLeader = 'OrgLeader',
  OrgWorker = 'OrgWorker',
}
