import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CarsService } from '../services/cars.service';

import { Car } from '../entities/car.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiResponse({ status: 200 })
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }
}
