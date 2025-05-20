import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from './reward.schema';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
  ) {}

  async create(dto: any, createdBy: string) {
    const reward = new this.rewardModel({ ...dto, createdBy });
    return reward.save();
  }

  async findAll() {
    return this.rewardModel.find();
  }
}
