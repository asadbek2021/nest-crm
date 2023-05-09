export class CreateUserDto {
  id: string;
  name: string;
  role: UserRoles;
  orgId: string;
  createdBy: string;
}

const enum UserRoles {
  Admin,
  OrgLeader,
  OrgWorker,
}
