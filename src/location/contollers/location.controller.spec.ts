import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from '../services/location.service';
import { LocationController } from './location.controller';

describe('LocationController', () => {
  let controller: LocationController;

  const location = {
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
  };

  const mockLocationService = {
    createLocation: jest.fn((locationDetails) => {
      return {
        id: Date.now(),
        ...locationDetails,
      };
    }),
    editLocation: jest.fn((id, locationEdits) => ({
      id,
      ...locationEdits,
    })),
    getAllLocations: jest.fn(() => location),
    getOneLocation: jest.fn((id) => ({
      id,
      location,
    })),
    deleteLocation: jest.fn((id) => ({
      id,
      location,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    })
      .overrideProvider(LocationService)
      .useValue(mockLocationService)
      .compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', () => {
    expect(controller.create(location)).toEqual({
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

    expect(mockLocationService.createLocation).toHaveBeenCalled();
  });

  it('should update a location', () => {
    expect(controller.update('1', location)).toEqual({
      id: 1,
      ...location,
    });

    expect(mockLocationService.editLocation).toHaveBeenCalled();
  });

  it('should get all locations', () => {
    expect(controller.getAll()).toEqual(location);

    expect(mockLocationService.getAllLocations).toHaveBeenCalled();
  });

  it('should get one location', () => {
    expect(controller.getOne('1')).toEqual({
      id: 1,
      location,
    });

    expect(mockLocationService.getOneLocation).toHaveBeenCalled();
  });

  it('should delete a location', () => {
    expect(controller.delete('1')).toEqual({
      id: 1,
      location,
    });

    expect(mockLocationService.deleteLocation).toHaveBeenCalled();
  });
});
