import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ username, chat }: ISettingsCreate): Promise<Setting> {

    const userAlreadyExists = await this.settingsRepository.findOne({ username });

    if(userAlreadyExists)
      throw new Error("User already exists!");
    
    
    const settings = this.settingsRepository.create({
      chat, 
      username
    });

    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string): Promise<Setting | undefined> {
    return await this.settingsRepository.findOne({ username });
  }

  async update(username: string, chat: boolean) {
    await this.settingsRepository
    .createQueryBuilder()
    .update(Setting)
    .set({ chat })
    .where("username = :username", {
      username
    })
    .execute();
  }

}

export { SettingsService }