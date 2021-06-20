import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('person')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 30, {
    message: 'Name must be at least 2 but not longer than 30 characters',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Column({ name: 'email', unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
