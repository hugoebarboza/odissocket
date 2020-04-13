import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// CLASS
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';
import { User } from '../class/types';


// Usuarios conectados
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = async (cliente: Socket, io: socketIO.Server) => {

    try {

        const usuario = new Usuario(cliente.id);
        usuariosConectados.agregar(usuario);

    } catch (err) {
        console.log(err);
    }

};

export const desconectar = async (cliente: Socket, io: socketIO.Server) => {

    try {

        cliente.on('disconnect', async () => {

            // console.log('Cliente desconectado', cliente.id);

            usuariosConectados.borrarUsuario(cliente.id);

            io.emit('usuarios-activos', usuariosConectados.getLista());
        });

    } catch (err) {
        console.log(err);
    }

};

// Escuchar mensajes
export const mensaje = async (cliente: Socket, io: socketIO.Server) => {

    try {

        cliente.on('mensaje', (payload: {de: string, cuerpo: string}, callback) => {

            console.log('mensaje recibido', payload);

            io.emit('mensaje-nuevo', payload);
        });

    } catch (err) {
        console.log(err);
    }

};

// Escuchar usuario
export const configurarUsuario = async (cliente: Socket, io: socketIO.Server) => {

    try {

        // tslint:disable-next-line:ban-types
        cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {

            // console.log('Configurando usuario', payload.usuario);

            usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

            io.emit('usuarios-activos', usuariosConectados.getLista());

            callback({
                ok: true,
                mensaje: `Usuario ${ payload.nombre }, configurado`
            }
            );

            // io.emit('configurar-usuario', payload);
        });

    } catch (err) {
        console.log(err);
    }

};


// Obtener Usuarios
export const obtenerUsuarios = async (cliente: Socket, io: socketIO.Server) => {

    try {
        cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
        });
    } catch (err) {
        console.log(err);
    }

};

// Listen Store Order
export const storeOrder = async (cliente: Socket, io: socketIO.Server) => {

    try {

        // tslint:disable-next-line:ban-types
        cliente.on('store-order', (payload: { userid: number, serviceid: number, orderid: number }, callback: Function) => {

            io.emit('store-order-completed', payload);

        });

    } catch (err) {
        console.log(err);
    }

};


// Listen Update Order
export const updateOrder = async (cliente: Socket, io: socketIO.Server) => {

    try {

        // tslint:disable-next-line:ban-types
        cliente.on('update-order', (payload: { serviceid: number, orderid: number }, callback: Function) => {

            io.emit('update-order-completed', payload);

        });

    } catch (err) {
        console.log(err);
    }

};


// Listen Update Order
export const deleteOrder = async (cliente: Socket, io: socketIO.Server) => {

    try {

        // tslint:disable-next-line:ban-types
        cliente.on('delete-order', (payload: { serviceid: number, orderid: number }, callback: Function) => {

            io.emit('delete-order-completed', payload);

        });

    } catch (err) {
        console.log(err);
    }

};
