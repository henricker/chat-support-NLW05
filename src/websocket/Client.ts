import { Socket } from 'socket.io';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UserService } from '../services/UserService';


interface IParams {
  message: string;
  email: string;
}

//Conect => get current connection
io.on('connect', (socket: Socket) => {
  socket.on('client_first_access', async (params) => {

    const connectionsService = new ConnectionsService();
    const userService = new UserService();
    const messagesService = new MessagesService();

    const { message, email } = params as IParams;
    const socketId = socket.id;
    let userId = null;

    //First, check if user already exists
    const userAlreadyExists = await userService.findByEmail(email);

    if(!userAlreadyExists) {
      const user = await userService.create(email);

      await connectionsService.create({
        socketId,
        userId: user.id
      })

      userId = user.id;
    }
    else {

      userId = userAlreadyExists.id;
      const connection = await connectionsService.findByUserId(userAlreadyExists.id);

      if(!connection) {
        await connectionsService.create({
          socketId,
          userId: userAlreadyExists.id
        });
      }
      else {
        connection.socketId = socketId;

        await connectionsService.create(connection);
      }

      //Saving messages
      await messagesService.create({ 
        text: message,
        userId
      });

    }
  });
});