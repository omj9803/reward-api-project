import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>
  ) {}

  async createEvent(data: any) {
    const event = new this.eventModel(data);
    return event.save();
  }

  async getAllEvents() {
    return this.eventModel.find().exec();
  }
}
