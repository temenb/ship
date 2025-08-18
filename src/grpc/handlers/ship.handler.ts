import * as grpc from '@grpc/grpc-js';
import * as ShipGrpc from '../../generated/auth';
import * as heathService from '../../services/health.service';

export const callbackError = (callback: grpc.sendUnaryData<any>, err: unknown) => {
  const message = err instanceof Error ? err.message : 'Unknown error';
  callback({ code: grpc.status.INTERNAL, message }, null);
};

export const health = async (
  call: grpc.ServerUnaryCall<ShipGrpc.Empty, ShipGrpc.HealthReport>,
  callback: grpc.sendUnaryData<ShipGrpc.HealthReport>
) => {
  try {
    const response = await heathService.health();

    callback(null, response);

  } catch (err: any) {
    callbackError(callback, err);
  }
};

export const status = async (
  call: grpc.ServerUnaryCall<ShipGrpc.Empty, ShipGrpc.StatusInfo>,
  callback: grpc.sendUnaryData<ShipGrpc.StatusInfo>
) => {
  try {
    const response = await heathService.status();

    callback(null, response);

  } catch (err: any) {
    callbackError(callback, err);
  }
};

export const livez = async (
  call: grpc.ServerUnaryCall<ShipGrpc.Empty, ShipGrpc.LiveStatus>,
  callback: grpc.sendUnaryData<ShipGrpc.LiveStatus>
) => {
  try {
    const response = await heathService.livez();

    callback(null, response);

  } catch (err: any) {
    callbackError(callback, err);
  }
};

export const readyz = async (
  call: grpc.ServerUnaryCall<ShipGrpc.Empty, ShipGrpc.ReadyStatus>,
  callback: grpc.sendUnaryData<ShipGrpc.ReadyStatus>
) => {
  try {
    const response = await heathService.readyz();

    callback(null, response);

  } catch (err: any) {
    callbackError(callback, err);
  }
};
