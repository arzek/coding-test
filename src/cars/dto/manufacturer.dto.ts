import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMobilePhone, IsNotEmpty, Length, Min } from 'class-validator';

export class ManufacturerDto {
  @IsNotEmpty()
  @Length(5)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsMobilePhone()
  @ApiProperty()
  phone: string;

  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  siret: number;
}
