import { Socket } from 'socket.io';
import socketIO from 'socket.io';

// CLASS
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

// Usuarios conectados
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {

    const usuario = new Usuario(cliente.id);

    usuariosConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {

        console.log('Cliente desconectado', cliente.id);

        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}, callback) => {
        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });
};

// Escuchar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {

        console.log('Configurando usuario', payload);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        }
        )

        // io.emit('configurar-usuario', payload);
    });
};


// Obtener Usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {


        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());


    });
};
