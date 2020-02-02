import Server from './class/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


// const nombre = 'Hugo E Barboza R';

// console.log(`Mi nombre es ${ nombre }`);

const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Services Router
server.app.use('/', router);

server.start(() => {
    console.log(`Server Start: ${server.port}`);
});

