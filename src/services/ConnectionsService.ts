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

  async findAllWithoutAdmin(): Promise<Connection[]> {
    return await this.connectionRepository.find(
      {
        where: { adminId: null },
        relations: ["user"]
      }
    )
  }

  async findBySocketId(socketId: string): Promise<Connection | undefined> {
    return await this.connectionRepository.findOne({ socketId });
  }

  async updateAdminId(userId: string, adminId: string) {
    await this.connectionRepository
    .createQueryBuilder()
    .update(Connection)
    .set({ adminId })
    .where("userId = :userId", {
      userId
    })
    .execute();
  }
}

export { ConnectionsService };