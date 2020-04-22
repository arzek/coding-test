import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManufacturersController } from './controllers/manufacturers/manufacturers.controller';
import { OwnersController } from './controllers/owners/owners.controller';
import { CarsController } from './controllers/cars/cars.controller';

import { ManufacturerService } from './services/manufacturer/manufacturer.service';
import { OwnerService } from './services/owner/owner.service';
import { CarsService } from './services/cars/cars.service';

import { Manufacturer } from './entities/manufacturer.entity';
import { Owner } from './entities/owner.entity';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Manufacturer, Owner])],
  controllers: [CarsController, ManufacturersController, OwnersController],
  providers: [CarsService, ManufacturerService, OwnerService],
})
export class CarsModule {}
