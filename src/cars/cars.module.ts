import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsController } from './controllers/cars.controller';
import { OwnersController } from './controllers/owners.controller';
import { ManufacturersController } from './controllers/manufacturers.controller';

import { CarService } from './services/car.service';
import { TasksService } from './services/task.service';
import { OwnerService } from './services/owner.service';
import { HelperService } from './services/helper/helper.service';
import { ManufacturerService } from './services/manufacturer.service';

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
