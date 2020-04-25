import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsController } from './controllers/cars/cars.controller';
import { OwnersController } from './controllers/owners/owners.controller';
import { ManufacturersController } from './controllers/manufacturers/manufacturers.controller';

import { CarService } from './services/car/car.service';
import { TasksService } from './services/task/task.service';
import { OwnerService } from './services/owner/owner.service';
import { HelperService } from './services/helper/helper.service';
import { ManufacturerService } from './services/manufacturer/manufacturer.service';

import { Car } from './entities/car.entity';
import { Owner } from './entities/owner.entity';
import { Manufacturer } from './entities/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Manufacturer, Owner])],
  controllers: [CarsController, ManufacturersController, OwnersController],
  providers: [
    CarService,
    ManufacturerService,
    OwnerService,
    TasksService,
    HelperService,
  ],
})
export class CarsModule {}
