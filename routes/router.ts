import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// CLASS
import { usuariosConectados } from '../sockets/socket';

// SERVER
import Server from '../class/server';

const uuid4 = uuidv4();

const router = Router();

router.get('/', (req: Request, res: Response) => {    
    res.json({
        ok: true,
        message: `Hello, ${uuid4}!`
    });
});


router.get('/msg', (req: Request, res: Response) => {

    res.json({
        ok: true,
        message: 'GET - todo ok'
    });

});

router.post('/msg', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload );

    res.json({
        ok: true,
        message: 'POST - todo ok',
        cuerpo,
        de,
    });

});


router.post('/msg/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        message: 'POST - todo ok',
        cuerpo,
        de,
        id
    });

});

// Get All Users
router.get('/usuarios', (req: Request, res: Response) => {    

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[]) => {
        if ( err ) {
            return res.json ({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        });
    });

});



// Get All Users and Detail
router.get('/usuarios/detalle', (req: Request, res: Response) => {    

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[]) => {
        if ( err ) {
            return res.json ({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes: usuariosConectados.getLista()
        });
    });

});


export default router;
