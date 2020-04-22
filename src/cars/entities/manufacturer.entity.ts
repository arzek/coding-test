import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ManufacturerDto } from '../dto/manufacturer.dto';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  siret: number;

  constructor(manufacturerDto: ManufacturerDto) {
    if (manufacturerDto) {
      this.name = manufacturerDto.name;
      this.phone = manufacturerDto.phone;
      this.siret = manufacturerDto.siret;
    }
  }
}
