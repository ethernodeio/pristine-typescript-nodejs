import { Server, IServerOptions } from "@open-rpc/server-js";
import openrpcDocument from "../openrpc.json";
import { Router } from "@open-rpc/server-js";
import { IHTTPServerTransportOptions } from "@open-rpc/server-js/build/transports/http";
import { IWebSocketServerTransportOptions } from "@open-rpc/server-js/build/transports/websocket";

import { Hello } from "../__GENERATED_TYPES__/index.js";

const getWorld = (): Promise<string> => {
  return Promise.resolve("world");
};

const hello: Hello = async () => {
  const world = await getWorld();
  return world;
};

const methods = {
  hello,
};

const router = new Router(openrpcDocument as any, methods);

const options = {
  methodMapping: methods,
  router,
  transportConfigs: [
    {
      type: "HTTPTransport",
      options: { port: 9000, middleware: [] } as IHTTPServerTransportOptions,
    },
    {
      type: "WebSocketTransport",
      options: { port: 9001, middleware: [], allowHTTP1: true } as IWebSocketServerTransportOptions,
    },
  ],
  openrpcDocument: openrpcDocument as any,
} as IServerOptions;

const server = new Server(options);

server.start();
if (options.transportConfigs) {
  console.log(options.transportConfigs.map((t: any) => `${t.type} running on: ${t.options.port}`).join("\n")); //tslint:disable-line
}
