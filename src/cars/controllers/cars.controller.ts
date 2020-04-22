import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CarsService } from '../services/cars/cars.service';

import { Car } from '../entities/car.entity';

import { CreateCarDto } from '../dto/create-car.dto';

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
  findOneById(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Success' })
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  async deleteOneById(@Param('id') id: string) {
    await this.carsService.deleteOne(id);
    return {
      status: 'Success',
      message: 'Car and manufacturer success delete',
    };
  }
}
