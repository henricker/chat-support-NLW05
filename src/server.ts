import { http } from './http';
import "./websocket/Client";
import './websocket/Admin';

http.listen(3333, () => console.log("Server is running on por 3333"));
