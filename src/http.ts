import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

import './database';
import { routes } from './routes';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require('ejs').renderFile);
app.set("view engine", "html");
app.use(express.json());
app.use(routes);

app.get('/pages/client', (request, response) => {
  response.render("html/client.html");
});

app.get('/pages/admin', (request, response) => {
  response.render("html/admin.html");
})

const http = createServer(app); //Building http protocol
const io = new Server(http); // Building websocket protocol

io.on('connection', (socket: Socket) => {
  console.log("Socket connected ", socket.id);
});

export { http, io };