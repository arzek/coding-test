import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManufacturerService } from '../../services/manufacturer/manufacturer.service';

import { Manufacturer } from '../../entities/manufacturer.entity';

import { ManufacturerDto } from '../../dto/manufacturer.dto';

@ApiTags('Manufacturers')
@Controller('cars/manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  getById(@Param('id') id: string): Promise<Manufacturer> {
    return this.manufacturerService.findOne(id);
  }

  @Get('car/:carId')
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Not found' })
  findOneByCarId(@Param('carId') carId: string): Promise<Manufacturer> {
    return this.manufacturerService.findOneByCarId(carId);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  updateById(
    @Param('id') id: string,
    @Body() manufacturerDto: ManufacturerDto,
  ): Promise<Manufacturer> {
    return this.manufacturerService.update(id, manufacturerDto);
  }
}
