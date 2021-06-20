import { CalculateRequest } from './../models/calculate-request.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Location } from '../models/location.interface';
import { LocationService } from '../services/location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  create(@Body() location: Location): Observable<Location> {
    return this.locationService.createLocation(location);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() location: Location,
  ): Observable<UpdateResult> {
    return this.locationService.editLocation(+id, location);
  }

  @Get()
  getAll(): Observable<Location[]> {
    return this.locationService.getAllLocations();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Observable<Location> {
    return this.locationService.getOneLocation(+id);
  }

  @Get('/calculate/:id')
  calculate(
    @Param('id') id: string,
    @Body() calculateRequest: CalculateRequest,
  ): Promise<number> {
    return this.locationService.calculateDistance(+id, calculateRequest);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<DeleteResult> {
    return this.locationService.deleteLocation(+id);
  }
}
