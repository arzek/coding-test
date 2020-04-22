import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
