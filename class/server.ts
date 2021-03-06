import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';


export default class Server {

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }

    public static get instance() {
        return this._intance || (this._intance = new this());
    }

    private escucharSockets() {

        // console.log('escuchando conexiones');

        this.io.on('connection', cliente => {

            // console.log('nuevo cliente conectado', cliente.id);

            // Conectar Cliente
            socket.conectarCliente(cliente, this.io);

            // Configurar Usuario
            socket.configurarUsuario(cliente, this.io);

            // Obtener Usuarios Activos
            socket.obtenerUsuarios(cliente, this.io);

            // Listen Store Order
            socket.storeOrder(cliente, this.io);

            // Listen Update Order
            socket.updateOrder(cliente, this.io);

            // Listen Delete Order
            socket.deleteOrder(cliente, this.io);

            // Pendiente de mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente, this.io);


        });
    }

    start (callback: any) {
        console.log(this.port);
        this.httpServer.listen(this.port, callback);
    }
}
