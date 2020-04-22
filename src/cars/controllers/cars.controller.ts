import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CarsService } from '../services/cars.service';

import { Car } from '../entities/car.entity';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success' })
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  async findOneById(@Param('id') id: string): Promise<Car> {
    const car = await this.carsService.findOne(id);
    if (car) {
      return car;
    }
    throw new NotFoundException('Car not found');
  }
}
