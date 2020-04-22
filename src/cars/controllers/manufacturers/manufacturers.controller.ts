import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManufacturerService } from '../../services/manufacturer/manufacturer.service';

import { Manufacturer } from '../../entities/manufacturer.entity';

import { ManufacturerDto } from '../../dto/manufacturer.dto';

@ApiTags('Manufacturers')
@Controller('cars/manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  updateById(
    @Param('id') id: string,
    @Body() manufacturerDto: ManufacturerDto,
  ): Promise<Manufacturer> {
    return this.manufacturerService.update(id, manufacturerDto);
  }
}
