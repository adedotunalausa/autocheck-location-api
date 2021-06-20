import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LocationService } from './services/location.service';
import { LocationController } from './contollers/location.controller';
import { LocationEntity } from './models/location.entity';
import { PersonEntity } from './models/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, PersonEntity])],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
