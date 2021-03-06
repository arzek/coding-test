import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CarService } from './car.service';
import { OwnerService } from './owner.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly carService: CarService,
    private readonly ownerService: OwnerService,
  ) {}

  @Cron('*/15 * * * *')
  async handleCron() {
    this.logger.debug('Begin task.');
    await Promise.all([
      this.ownerService.removeByPurchaseDateRange(),
      this.carService.setDiscount(),
    ]);
    this.logger.debug('End task.');
  }
}
