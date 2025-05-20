import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardRequest } from './reward-request.schema';
import { Model } from 'mongoose';
import { Event } from './event.schema';

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel(RewardRequest.name)
    private requestModel: Model<RewardRequest>,
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
  ) {}

  async create(dto: any, userId: string) {
    // 중복 요청 방지
    const existing = await this.requestModel.findOne({
      eventId: dto.eventId,
      userId,
    });

    if (existing) {
      return this.requestModel.create({
        ...dto,
        userId,
        requestedAt: new Date().toISOString(),
        status: 'REJECTED',
        reason: '이미 요청한 보상입니다.',
      });
    }

    // 이벤트 유효성 검사
    const event = await this.eventModel.findOne({ eventId: dto.eventId, isActive: true });
    if (!event) {
      return this.requestModel.create({
        ...dto,
        userId,
        requestedAt: new Date().toISOString(),
        status: 'REJECTED',
        reason: '이벤트가 활성화되어 있지 않습니다.',
      });
    }

    // 조건 충족 시 정상 요청 처리
    return this.requestModel.create({
      ...dto,
      userId,
      requestedAt: new Date().toISOString(),
      status: 'PENDING',
      reason: null,
    });
  }

  async findMy(userId: string) {
    return this.requestModel.find({ userId });
  }

  async findAll() {
    return this.requestModel.find();
  }
}
