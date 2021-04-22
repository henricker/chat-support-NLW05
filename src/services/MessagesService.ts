import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository"


interface IMessageCreated {
  adminId: string;
  text: string;
  userId: string;
}


class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }
  async create({ adminId, text, userId }: IMessageCreated): Promise<Message> {

    const message = this.messagesRepository.create({
      adminId,
      text,
      userId
    });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(userId: string): Promise<Message[]> {
    const list = await this.messagesRepository.find({
      where: { userId }
    });

    return list;
  }
}

export { MessagesService }