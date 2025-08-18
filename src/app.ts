import dotenv from 'dotenv';
import { ShipService } from './generated/ship';
import * as grpc from '@grpc/grpc-js';
import * as shipHandler from "./grpc/handlers/ship.handler";

dotenv.config();

const server = new grpc.Server();

server.addService(ShipService, {
    // register: shipHandler.register,
    // login: shipHandler.login,
    // refreshTokens: shipHandler.refreshTokens,
    // logout: shipHandler.logout,
    // forgotPassword: shipHandler.forgotPassword,
    // resetPassword: shipHandler.resetPassword,
  health: shipHandler.health,
  status: shipHandler.status,
  livez: shipHandler.livez,
  readyz: shipHandler.readyz,
});

export default server;
