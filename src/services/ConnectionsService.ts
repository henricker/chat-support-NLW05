import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  adminId?: string;
  socketId: string;
  userId: string;
  id?: string;
}


class ConnectionsService {

  private connectionRepository: Repository<Connection>

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socketId, userId, adminId, id }: IConnectionCreate): Promise<Connection> {

    const connection = this.connectionRepository.create({
      adminId,
      socketId,
      userId,
      id
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(userId: string): Promise<Connection | undefined> {
    return await this.connectionRepository.findOne({ userId });
  }
}

export { ConnectionsService };