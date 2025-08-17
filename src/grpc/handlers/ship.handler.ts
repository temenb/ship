import * as grpc from '@grpc/grpc-js';
import * as ShipGrpc from '../../generated/ship';
import * as shipService from '../../services/ship.service';


// export const register = async (
//     call: grpc.ServerUnaryCall<ShipGrpc.RegisterRequest, ShipGrpc.ShipResponse>,
//     callback: grpc.sendUnaryData<ShipGrpc.ShipResponse>
// ) => {
//     const { email, password } = call.request;
//
//     try {
//         await shipService.createUser(email, password);
//
//         const result = await shipService.login(email, password);
//
//         callback(null, {
//             accessToken: result.accessToken?? '',
//             refreshToken: result.refreshToken?? '',
//             userId: result.userId,
//         });
//
//     } catch (err: any) {
//         callback({
//             code: grpc.status.INTERNAL,
//             message: err.message,
//         }, null);
//     }
// };
//
// export const login = async (
//     call: grpc.ServerUnaryCall<ShipGrpc.LoginRequest, ShipGrpc.ShipResponse>,
//     callback: grpc.sendUnaryData<ShipGrpc.ShipResponse>
// ) => {
//     const { email, password } = call.request;
//
//     try {
//         const result = await shipService.login(email, password);
//
//         callback(null, {
//             accessToken: result.accessToken?? '',
//             refreshToken: result.refreshToken?? '',
//             userId: result.userId,
//         });
//
//     } catch (err: any) {
//         callback({
//             code: grpc.status.INTERNAL,
//             message: err.message,
//         }, null);
//     }
// };
//
// export const refreshTokens = async (
//     call: grpc.ServerUnaryCall<ShipGrpc.RefreshTokensRequest, ShipGrpc.RefreshTokensResponse>,
//     callback: grpc.sendUnaryData<ShipGrpc.RefreshTokensResponse>
// ) => {
//     const { token } = call.request;
//
//     try {
//         const tokens = await shipService.refreshTokens(token);
//
//         callback(null, {
//             accessToken: tokens.accessToken?? '',
//             refreshToken: tokens.refreshToken?? '',
//         });
//
//     } catch (err: any) {
//         callback({
//             code: grpc.status.INTERNAL,
//             message: err.message,
//         }, null);
//     }
// };
//
// export const logout = async (
//     call: grpc.ServerUnaryCall<ShipGrpc.LogoutRequest, ShipGrpc.LogoutResponse>,
//     callback: grpc.sendUnaryData<ShipGrpc.LogoutResponse>
// ) => {
//     const { userId } = call.request;
//
//     try {
//         await shipService.logout(userId);
//
//         callback(null, {
//             success: true,
//             message: 'Logged out successfully',
//         });
//
//     } catch (err: any) {
//         callback({
//             code: grpc.status.INTERNAL,
//             message: err.message,
//         }, null);
//     }
// };
