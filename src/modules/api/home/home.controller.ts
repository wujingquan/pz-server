import { count } from 'console';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeService } from './home.service';
import Banner from '@/entities/admin/banner.entity';
import { Authorize } from '@/modules/admin/core/decorators/authorize.decorator';
import hospital from '@/modules/api/home/data/hospital';
import nav from '@/modules/api/home/data/nav';
import server from '@/modules/api/home/data/server';
import Consumer from '@/entities/consumer.entity';
import City from '@/entities/city.entity';
import { Page } from '@/common/decorators/page.decorator';
import Hospital from '@/entities/hospital.entity';
import Server from '@/entities/server.entity';

@Controller('')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    @InjectRepository(Banner) private bannerRepository: Repository<Banner>,
    @InjectRepository(Consumer)
    private consumerRepository: Repository<Consumer>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Server)
    private serverRepository: Repository<Server>,
  ) {}

  @Get('/api/v1.index/get_swiper_list')
  @Authorize()
  async getBannerList() {
    const [items, count] = await this.bannerRepository.findAndCount();
    return {
      items: items.map((item) => {
        return {
          ...item,
          image:
            'http://127.0.0.1:7001/' + item.image.replace('uploads', 'public'),
        };
      }),
      count,
    };
  }

  @Get('/api/v1.index/get_nav_list')
  @Authorize()
  async getNavList() {
    return nav;
  }

  @Get('/api/v1.index/get_city_list')
  @Authorize()
  @Page()
  getCityList() {
    return this.cityRepository.findAndCount();
  }

  @Get('/api/v1.hospital/get_list')
  @Authorize()
  @Page()
  hospitalGetList(@Query('city_id') city_id) {
    return this.hospitalRepository.findAndCount({
      where: {
        city_id,
      },
    });
  }

  @Get('/api/v1.server/get_hospital_list')
  @Authorize()
  getHospitalList(
    @Query('city_id') city_id,
    @Query('hospital_id') hospital_id,
  ) {
    console.log(city_id, hospital_id);
    const hospitalIdList = hospital.rows
      .filter((item) => item.city_id === Number(city_id))
      .map((item) => item.id);
    console.log(hospitalIdList);
    return {
      list: server
        .filter(
          (item) =>
            item.hospital_id === Number(hospital_id) &&
            hospitalIdList.includes(Number(item.hospital_id)),
        )
        .map((item) => {
          return {
            ...item,
            hospital_name: hospital.rows.find((h) => h.id === item.hospital_id)
              .hospital_name,
          };
        }),
    };
  }

  /**
   * 根据服务名获取医院信息和服务信息
   */
  @Get('/api/v1.hospital/server_get_list')
  @Authorize()
  async getServerList(
    @Query('city_id') city_id,
    @Query('server_name') server_name,
  ) {
    const serverList = await this.serverRepository.findBy({ server_name });
    const hospitalList = await this.hospitalRepository.findBy({ city_id });
    const obj = {
      list: [],
    };
    for (const hospital of hospitalList) {
      const server = serverList.find(
        (server) => server.hospital_id === hospital.id,
      );
      if (server) {
        obj.list.push({
          ...hospital,
          server,
        });
      }
    }
    return obj;
  }

  /**
   * 根据服务名获取医院信息和服务信息
   */
  @Get('/api/v1.consumer/get_consumer_list')
  @Authorize()
  async getConsumerList() {
    const [items, count] = await this.consumerRepository.findAndCount();
    return {
      list: items,
      total: count,
    };
  }

  @Post('/api/v1.consumer/add_consumer')
  @Authorize()
  async addConsumer(@Body() body) {
    const consumer = this.consumerRepository.create({ ...body });
    await this.consumerRepository.save(consumer);
    return consumer;
  }

  @Get('/api/v1.consumer/get_info')
  @Authorize()
  async getConsumerInfo(@Query('consumer_id') consumer_id) {
    return await this.consumerRepository.findOneBy({
      id: consumer_id,
    });
  }

  @Post('/api/v1.consumer/edit_consumer')
  @Authorize()
  async editConsumer(@Body() body) {
    const { consumer_id, ...consumer } = body;
    await this.consumerRepository.update(consumer_id, consumer);
  }

  @Post('/api/v1.consumer/delete_consumer')
  @Authorize()
  async deleteConsumer(@Body() body) {
    const { consumer_id } = body;
    await this.consumerRepository.delete(consumer_id);
  }
}
