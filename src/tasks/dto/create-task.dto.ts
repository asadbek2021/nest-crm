export class CreateTaskDto {
  id: string;
  orgId: string;
  createdBy: string;
  projectId: string;
  dueDate: Date;
  workerUserId: string;
  status: TaskStatus;
  doneAt: Date;
}

export const enum TaskStatus {
  CREATED = 'CREATED',
  IN_PROCESS = 'IN_PROCESS',
  DONE = 'DONE',
}
