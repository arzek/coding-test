import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';

import { ManufacturerDto } from './manufacturer.dto';
import { OwnerDto } from './owner.dto';
import { Type } from 'class-transformer';

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

  @ValidateNested({ each: true })
  @Type(() => ManufacturerDto)
  @ApiProperty()
  manufacturer?: ManufacturerDto;

  @ValidateNested({ each: true })
  @Type(() => OwnerDto)
  @ApiProperty({ type: () => [OwnerDto] })
  owners?: OwnerDto[];
}
