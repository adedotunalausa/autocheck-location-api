import { Location } from './../models/location.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from '../models/location.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  createLocation(location: Location): Observable<Location> {
    return from(this.locationRepository.save(location));
  }
}
