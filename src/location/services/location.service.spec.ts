import { PersonEntity } from './../models/person.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationEntity } from '../models/location.entity';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  const mockLocationRepository = {};

  const mockPersonRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(LocationEntity),
          useValue: mockLocationRepository,
        },
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: mockPersonRepository,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
