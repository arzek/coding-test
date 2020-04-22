import { Module } from '@nestjs/common';

import { CarsModule } from './cars/cars.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ormConfig } from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CarsModule],
})
export class AppModule {}
