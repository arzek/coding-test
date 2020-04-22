import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateCarDto {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  price: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  firstRegistrationDate: Date;
}
