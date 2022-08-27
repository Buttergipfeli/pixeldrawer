import { NextApiRequest } from "next";
import { Server as NetServer } from 'http';
import { Server } from "socket.io";
import { NextApiResponseServerIO } from "../../../models/types/nextapiresponseserverio";

export default async function SocketHandler(
    req: NextApiRequest,
    res: NextApiResponseServerIO
) {
    if (!res.socket.server.io) {
        console.log("New Socket");

        const httpServer: NetServer = res.socket.server as any;

        const io = new Server(httpServer);

        res.socket.server.io = io;
    } else {
        console.log("Socket ist already on");
    }

    res.end();
}