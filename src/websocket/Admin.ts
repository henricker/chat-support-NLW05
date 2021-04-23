import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async (socket) => {

  const connectionsService = new ConnectionsService();
  const messageService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { userId } = params;

    const allMessages = await messageService.listByUser(userId);

    callback(allMessages);
  });

  socket.on("admin_send_message", async (params) => {
    const { text, userId } = params;

    await messageService.create({
      text,
      userId,
      adminId: socket.id
    });

    const { socketId } = await connectionsService.findByUserId(userId);

    io.to(socketId).emit("admin_send_to_client", {
      text,
      socketId: socket.id
    });
  });

  socket.on("admin_user_in_support", async (params) => {
    const { userId } = params;
    await connectionsService.updateAdminId(userId, socket.id);
    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  });
});