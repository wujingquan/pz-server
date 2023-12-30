import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Banner from 'src/entities/admin/banner.entity';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './banner';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private bannerRepository: Repository<Banner>,
  ) {}

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   * @param param Object 对应Banner实体类
   */
  async add(param: CreateBannerDto): Promise<void> {
    await this.bannerRepository.insert({
      // title: param.title,
      title: param.title,
      image: param.image,
      status: param.status,
      weight: param.weight,
    });
  }

  /**
   * 根据部门ID进行分页查询用户列表
   * deptId = -1 时查询全部
   */
  async page(): Promise<[any, number]> {
    return await this.bannerRepository.findAndCount();
  }

  async delete(ids: number[]) {
    await this.bannerRepository.delete(ids);
  }

  async info(id) {
    return await this.bannerRepository.findOne({
      where: { id },
    });
  }
}
