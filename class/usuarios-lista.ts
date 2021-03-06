import { Usuario } from './usuario';
import { User } from './types';


export class UsuariosLista {

    private lista: Usuario[] = [];


    constructor() { }

    // Agregar un usuario
    public agregar( usuario: Usuario ) {

        // console.log('===== Agregando usuario ====');
        // console.log(usuario);
        this.lista.push( usuario );
        return usuario;
    }

    public actualizarNombre( id: string, nombre: string ) {

        // console.log('===== Viene Actualizando usuario ====');

        // tslint:disable-next-line:prefer-const
        for ( let usuario of this.lista ) {

            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }

        }
        console.log('===== Actualizando usuario ====');
        console.log( this.lista );

    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista.filter ( usuario => usuario.nombre !== 'sin-email');
    }

    // Obtener un usuario
    public getUsuario( id: string ) {

        return this.lista.find( usuario => usuario.id === id );

    }

    // Obtener usuario en una sala en particular
    public getUsuariosEnSala( sala: string ) {

        return this.lista.filter( usuario => usuario.sala === sala );

    }

    // Borrar Usuario
    public borrarUsuario( id: string ) {

        // console.log('===== Borrando usuario ====');
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );

        console.log(this.lista);

        return tempUsuario;

    }


}

