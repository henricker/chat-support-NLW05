import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";


class MessagesController {

  //Caso adminId seja undefined, quem enviou a mensagem foi o usuário
  //Caso adminId seja !== undefined, quem enviou a mensagem foi o admin
  async create(request: Request, response: Response) {

    const { adminId, userId, text } = request.body;

    const messagesService = new MessagesService();

    const message = await messagesService.create({ adminId, userId, text });

    return response.json(message);

  }

  async showByUser(request: Request, response: Response) {
    const { userId } = request.params;

    const messagesService = new MessagesService();

    const list = await messagesService.listByUser(userId);

    return response.json(list);
  }

 }

export { MessagesController };