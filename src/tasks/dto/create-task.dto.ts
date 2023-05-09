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

const enum TaskStatus {
  CREATED,
  IN_PROCESS,
  DONE,
}
