import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { CarsModule } from './cars/cars.module';

import { ormConfig } from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ScheduleModule.forRoot(),
    CarsModule,
  ],
})
export class AppModule {}
