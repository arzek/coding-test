import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CarService } from '../services/car.service';

import { Car } from '../entities/car.entity';

import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Success' })
  findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get('manufacturer/:manufacturerId')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  findOneByManufacturerId(
    @Param('manufacturerId') manufacturerId: string,
  ): Promise<Car> {
    return this.carService.findOneByManufacturerId(manufacturerId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  findOneById(@Param('id') id: string): Promise<Car> {
    return this.carService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Success' })
  create(@Body() carDto: CreateCarDto): Promise<Car> {
    return this.carService.create(carDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  updateById(
    @Param('id') id: string,
    @Body() carDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.updateOne(id, carDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  async deleteOneById(@Param('id') id: string) {
    await this.carService.deleteOne(id);
    return {
      status: 'Success',
      message: 'Car and manufacturer/owners success delete',
    };
  }
}
