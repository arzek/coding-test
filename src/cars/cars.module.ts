import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './controllers/cars.controller';

import { CarsService } from './services/cars/cars.service';
import { ManufacturerService } from './services/manufacturer/manufacturer.service';

import { Car } from './entities/car.entity';
import { Manufacturer } from './entities/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Manufacturer])],
  controllers: [CarsController],
  providers: [CarsService, ManufacturerService],
})
export class CarsModule {}
