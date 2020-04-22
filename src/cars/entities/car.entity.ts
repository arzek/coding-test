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

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(type => Manufacturer)
  @JoinColumn()
  manufacturer: Manufacturer;

  @Column()
  price: number;

  @Column('timestamp')
  firstRegistrationDate: Date;

  @ManyToMany(type => Owner)
  @JoinTable()
  owners: Owner[];
}
