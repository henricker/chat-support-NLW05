import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import './database';
import { routes } from './routes';

const app = express();
app.use(express.json());
app.use(routes);

const http = createServer(app); //Building http protocol
const io = new Server(http); // Building websocket protocol

io.on('connection', (socket: Socket) => {
  console.log("Socket connected, ", socket.id);
});

http.listen(3333, () => console.log("Server is running on por 3333"));
