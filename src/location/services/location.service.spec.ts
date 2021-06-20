import { PersonEntity } from './../models/person.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationEntity } from '../models/location.entity';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  const locations = [
    {
      name: 'Test Location',
      description: 'A location for testing',
      website: 'adedotunalausa.com',
      phone: '08139649118',
      contactPerson: {
        name: 'Adedotun Alausa',
        email: 'adedotunalausa2434@gmail.com',
        phone: '08139649118',
        address: '2 Magodo phase 2',
        city: 'Lagos',
        state: 'Lagos',
      },
      longitude: 48924874.9234,
      latitude: 9896567.3278,
    },
    {
      name: 'Test Location2',
      description: 'Another location for testing2',
      website: 'autocheck.com',
      phone: '08139649118',
      contactPerson: {
        name: 'Adedotun Alausa',
        email: 'adedotunalausa2434@gmail.com',
        phone: '08139649118',
        address: '2 Magodo phase 2',
        city: 'Lagos',
        state: 'Lagos',
      },
      longitude: 48924874.9234,
      latitude: 9896567.3278,
    },
  ];

  const locationUpdate = {
    name: 'Test Location',
    description: 'A location for testing',
    website: 'adedotunalausa.com',
    phone: '08139649118',
    contactPerson: {
      id: 1,
      name: 'Adedotun Alausa',
      email: 'adedotunalausa2434@gmail.com',
      phone: '08139649118',
      address: '2 Magodo phase 2',
      city: 'Lagos',
      state: 'Lagos',
    },
    longitude: 48924874.9234,
    latitude: 9896567.3278,
  };

  const mockLocationRepository = {
    save: jest.fn().mockImplementation((locationDetails) =>
      Promise.resolve({
        id: Date.now(),
        ...locationDetails,
      }),
    ),
    update: jest.fn().mockImplementation((id, locationDetails) =>
      Promise.resolve({
        id,
        ...locationDetails,
      }),
    ),
    find: jest.fn().mockImplementation(() => Promise.resolve(locations)),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(locations[0])),
  };

  const mockPersonRepository = {
    update: jest.fn().mockImplementation((id, personDetails) =>
      Promise.resolve({
        id,
        ...personDetails,
      }),
    ),
  };

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

  it('should create a new location record and return that', (done) => {
    service.createLocation(locations[0]).subscribe((res) => {
      expect(res).toEqual({
        id: expect.any(Number),
        name: 'Test Location',
        description: 'A location for testing',
        website: 'adedotunalausa.com',
        phone: '08139649118',
        contactPerson: {
          name: 'Adedotun Alausa',
          email: 'adedotunalausa2434@gmail.com',
          phone: '08139649118',
          address: '2 Magodo phase 2',
          city: 'Lagos',
          state: 'Lagos',
        },
        longitude: 48924874.9234,
        latitude: 9896567.3278,
      });
      done();
    });
  });

  it('should update a new location and return that', (done) => {
    service.editLocation(1, locationUpdate).subscribe((res) => {
      expect(res).toEqual({
        id: 1,
        name: 'Test Location',
        description: 'A location for testing',
        website: 'adedotunalausa.com',
        phone: '08139649118',
        contactPerson: {
          id: 1,
          name: 'Adedotun Alausa',
          email: 'adedotunalausa2434@gmail.com',
          phone: '08139649118',
          address: '2 Magodo phase 2',
          city: 'Lagos',
          state: 'Lagos',
        },
        longitude: 48924874.9234,
        latitude: 9896567.3278,
      });
      done();
    });
  });

  it('should get all locations', (done) => {
    service.getAllLocations().subscribe((res) => {
      expect(res).toEqual(locations);
      done();
    });
  });

  it('should get one location', (done) => {
    service.getOneLocation(1).subscribe((res) => {
      expect(res).toEqual(locations[0]);
      done();
    });
  });
});
