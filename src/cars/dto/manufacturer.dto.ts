import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class ManufacturerDto {
  @IsNotEmpty()
  @IsString()
  @Length(5)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsMobilePhone()
  @ApiProperty({ example: '+380994154440' })
  phone: string;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  siret: number;
}
