import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class OwnerDto {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  purchaseDate: Date;
}
