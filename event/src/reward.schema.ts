import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reward extends Document {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  createdBy: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
