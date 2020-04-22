import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Manufacturer } from './manufacturer.entity';
import { Owner } from './owner.entity';
import { CarDto } from '../dto/car.dto';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Manufacturer)
  @JoinColumn()
  manufacturer: Manufacturer;

  @Column()
  price: number;

  @Column('timestamp')
  firstRegistrationDate: Date;

  @ManyToMany(() => Owner)
  @JoinTable()
  owners: Owner[];

  constructor(carDto: CarDto) {
    if (carDto) {
      this.price = carDto.price;
      this.firstRegistrationDate = carDto.firstRegistrationDate;
      this.manufacturer = new Manufacturer(carDto.manufacturer);
      this.owners = [];
      for (const ownerDto of carDto.owners) {
        this.owners.push(new Owner(ownerDto));
      }
    }
  }
}
