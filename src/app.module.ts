import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsModule } from './cars/cars.module';

import { ormConfig } from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CarsModule],
})
export class AppModule {}
