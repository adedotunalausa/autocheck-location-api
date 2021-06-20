import { CalculateRequest } from './../models/calculate-request.interface';
import { Location } from './../models/location.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { LocationEntity } from '../models/location.entity';
import { from, Observable } from 'rxjs';
import { PersonEntity } from '../models/person.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,

    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  createLocation(location: Location): Observable<Location> {
    return from(this.locationRepository.save(location));
  }

  editLocation(id: number, location: Location): Observable<UpdateResult> {
    this.personRepository.update(
      location.contactPerson.id,
      location.contactPerson,
    );
    return from(this.locationRepository.update(id, location));
  }

  getAllLocations(): Observable<Location[]> {
    return from(this.locationRepository.find({ relations: ['contactPerson'] }));
  }

  getOneLocation(id: number): Observable<Location> {
    return from(
      this.locationRepository.findOne(id, { relations: ['contactPerson'] }),
    );
  }

  deleteLocation(id: number): Observable<DeleteResult> {
    return from(this.locationRepository.delete(id));
  }

  async calculateDistance(
    id: number,
    calculateRequest: CalculateRequest,
  ): Promise<number> {
    const radiusOfEarth = 6371; // radius of the earth in kilometers(km)
    const latitude1 = calculateRequest.latitude;
    const longitude1 = calculateRequest.longitude;
    const otherLocation = await this.locationRepository.findOne(id);
    const latitude2 = otherLocation.latitude;
    const longitude2 = otherLocation.longitude;
    const latitudeInRadians = this.degreeToRadians(latitude2 - latitude1);
    const longitudeInRadians = this.degreeToRadians(longitude2 - longitude1);
    const a =
      Math.sin(latitudeInRadians / 2) * Math.sin(latitudeInRadians / 2) +
      Math.cos(this.degreeToRadians(latitude1)) *
        Math.cos(this.degreeToRadians(latitude2)) *
        Math.sin(longitudeInRadians / 2) *
        Math.sin(longitudeInRadians / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radiusOfEarth * c; // distance in km

    return distance;
  }

  degreeToRadians(degree: number) {
    return degree * (Math.PI / 180);
  }
}
