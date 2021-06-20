import { IsNotEmpty } from 'class-validator';
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

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Location name is required' })
  name: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  phone: string;

  @OneToOne(() => PersonEntity, {
    cascade: ['insert'],
  })
  @JoinColumn()
  contactPerson: PersonEntity;

  @Column()
  @IsNotEmpty({ message: 'Longitude is required' })
  longitude: number;

  @Column()
  @IsNotEmpty({ message: 'Latitude is required' })
  latitude: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
