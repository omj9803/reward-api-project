import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('events')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  createEvent(@Body() body: any) {
    return this.eventService.createEvent(body);
  }

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }
}  