import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsController } from './controllers/cars/cars.controller';
import { OwnersController } from './controllers/owners/owners.controller';
import { ManufacturersController } from './controllers/manufacturers/manufacturers.controller';

import { CarsService } from './services/cars/cars.service';
import { OwnerService } from './services/owner/owner.service';
import { ManufacturerService } from './services/manufacturer/manufacturer.service';

import { Car } from './entities/car.entity';
import { Owner } from './entities/owner.entity';
import { Manufacturer } from './entities/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Manufacturer, Owner])],
  controllers: [CarsController, ManufacturersController, OwnersController],
  providers: [CarsService, ManufacturerService, OwnerService],
})
export class CarsModule {}
