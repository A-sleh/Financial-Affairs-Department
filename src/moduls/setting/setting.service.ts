import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto) {
    const setting = new Setting();
    const alreadySettingExisit = await this.settingRepository.find();

    if (alreadySettingExisit.length > 0) {
      throw new BadRequestException('Setting already exists');
    }

    if (!createSettingDto.amper_price || !createSettingDto.counter_price) {
      throw new BadRequestException('Invalid input data');
    }

    try {
      setting.amper_price = createSettingDto.amper_price;
      setting.counter_price = createSettingDto.counter_price;
      const savedSetting = await this.settingRepository.save(setting);
      return savedSetting;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create setting');
    }
  }

  async getSettings() {
    const settings = await this.settingRepository.find();

    if (!settings || settings.length === 0) {
      throw new BadRequestException('No settings found');
    }

    return settings[0];
  }

  async update(updateSettingDto: UpdateSettingDto) {
    const setting = await this.getSettings();

    if (!setting) {
      throw new InternalServerErrorException('Setting not found');
    }

    try {
      this.settingRepository.update(setting.setting_id, updateSettingDto);
      return { message: 'Setting updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update setting');
    }
  }
}
