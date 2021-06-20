import { Person } from './person.interface';

export interface Location {
  id?: number;
  name?: string;
  description?: string;
  website?: string;
  phone?: string;
  contactPerson?: Person;
  longitude?: number;
  latitude?: number;
}
