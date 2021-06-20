import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity('location')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  phone: string;

  @OneToOne((type) => PersonEntity, { cascade: ['insert', 'update'] })
  @JoinColumn()
  contactPerson: PersonEntity;

  @Column()
  longitude: number;

  @Column()
  latitude: number;
}
