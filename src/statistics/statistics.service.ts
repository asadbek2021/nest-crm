import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class StatisticsService {
  constructor(@InjectModel() private knex: Knex) {}

  async getOrganizationLevelStat(orgId: string) {
    const org = await this.knex('organizations').where('id', orgId).first();
    const orgProjects = await this.knex
      .table('projects')
      .where('org_id', orgId)
      .count();
    const projectsCount = orgProjects[0].count;
    const tasks = await this.knex.table('tasks').where('org_id', orgId).count();
    const tasksCount = tasks[0].count;

    return {
      org_name: org.name,
      org_project_count: projectsCount,
      org_tasks_count: tasksCount,
    };
  }
}
