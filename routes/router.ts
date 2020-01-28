import { Router, Request, Response } from 'express';

const router = Router();

router.get('/msg', (req: Request, res: Response) => {

    res.json({
        ok: true,
        message: 'GET - todo ok'
    });

});

router.post('/msg/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    res.json({
        ok: true,
        message: 'POST - todo ok',
        cuerpo,
        de,
        id
    });

});


export default router;
