import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Withdrawal from 'src/entities/withdrawal.entity';
import { DataSource, Repository } from 'typeorm';
import Decimal from 'decimal.js';
import dayjs from 'dayjs';
import { CreateEntityDto } from '@/modules/admin/manage/withdrawal/withdrawal.dto';
import Member from '@/entities/member.entity';

@Injectable()
export class WithdrawalService {
  constructor(
    @InjectRepository(Withdrawal)
    private withdrawalRepository: Repository<Withdrawal>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private dataSource: DataSource,
  ) {}

  async add(param: CreateEntityDto): Promise<void> {
    await this.withdrawalRepository.insert(param);
  }

  async page(): Promise<[any, number]> {
    return this.withdrawalRepository
      .createQueryBuilder('withdrawal')
      .leftJoinAndMapOne(
        'withdrawal.member',
        Member,
        'member',
        'member.id=withdrawal.member_id',
      )
      .getManyAndCount();
  }

  async info(id) {
    return await this.withdrawalRepository.findOne({
      where: { id },
    });
  }

  async process(dto) {
    const withdrawal = await this.withdrawalRepository.findOneBy({
      id: dto.id,
    });
    if (!withdrawal) {
      throw new BadRequestException('提现订单不存在');
    }
    if (withdrawal.audit_status !== null) {
      throw new BadRequestException('状态不能多次更变');
    }
    const member = await this.memberRepository.findOneBy({
      id: withdrawal.member_id,
    });
    if (!member) {
      throw new BadRequestException('陪诊师不存在');
    }
    withdrawal.audit_status = dto.audit_status;
    withdrawal.audit_time = dayjs().toDate();
    if (dto.audit_status === 1) {
      await this.withdrawalRepository.save(withdrawal);
    } else if (dto.audit_status === 2) {
      // 审核不通过
      // 金额退回账户
      member.money = Decimal.add(member.money, withdrawal.money).toNumber();
      // 事务
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.save(member);
        await queryRunner.manager.save(withdrawal);
        await queryRunner.commitTransaction();
      } catch (err) {
        console.error(err);
        await queryRunner.rollbackTransaction();
        throw new BadRequestException('审核失败，请稍后再试');
      } finally {
        await queryRunner.release();
      }
    } else {
      console.log('else');
    }
  }
}
