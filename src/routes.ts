import { Router } from 'express';

//controllers
import {  SettingsController } from './controllers/SettingsController';
import { UserController } from './controllers/UserController';
import { MessagesController } from './controllers/MessagesController';

const settingsController = new SettingsController();
const userController = new UserController;
const messagesController = new MessagesController();

const routes = Router();

routes.post("/settings", settingsController.create);

routes.post("/users", userController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:userId", messagesController.showByUser);


export { routes };