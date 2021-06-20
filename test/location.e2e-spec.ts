import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LocationModule } from '../src/location/location.module';
import { LocationEntity } from '../src/location/models/location.entity';
import { PersonEntity } from '../src/location/models/person.entity';

describe('LocationController (e2e)', () => {
  let app: INestApplication;

  const mockLocationRepository = {
    find: jest.fn(),
  };
  const mockPersonRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocationModule],
    })
      .overrideProvider(getRepositoryToken(LocationEntity))
      .useValue(mockLocationRepository)
      .overrideProvider(getRepositoryToken(PersonEntity))
      .useValue(mockPersonRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/location (GET)', () => {
    return request(app.getHttpServer()).get('/location').expect(200);
  });
});
