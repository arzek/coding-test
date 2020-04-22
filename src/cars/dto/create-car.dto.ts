import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Min } from 'class-validator';

import { ManufacturerDto } from './manufacturer.dto';
import { OwnerDto } from './owner.dto';

export class CreateCarDto {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  price: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  firstRegistrationDate: Date;

  @ApiProperty()
  manufacturer: ManufacturerDto;

  @ApiProperty({ type: () => [OwnerDto] })
  owners: OwnerDto[];
}
