import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import Config from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    TasksModule,
    StatisticsModule,
    KnexModule.forRoot({
      config: {
        client: 'postgres',
        useNullAsDefault: true,
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT || 5432),
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
