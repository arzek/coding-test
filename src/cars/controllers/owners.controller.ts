import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { OwnerService } from '../services/owner.service';

import { Owner } from '../entities/owner.entity';

import { OwnerDto } from '../dto/owner.dto';

@ApiTags('Owners')
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownerService: OwnerService) {}

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Success' })
  updateById(
    @Param('id') id: string,
    @Body() ownerDto: OwnerDto,
  ): Promise<Owner> {
    return this.ownerService.update(id, ownerDto);
  }
}
