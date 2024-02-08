import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statService: StatisticsService) {}
  @Get('/organization/:id')
  getOrganizationLevelStat(@Param('id') orgId: string) {
    return this.statService.getOrganizationLevelStat(orgId);
  }
}
