import { app } from '@/app';
import configuration from '@config';
import * as http from 'http';

export const server = http.createServer(app);
const port = configuration.PORT;
app.set('port', port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: Error): void {
    throw error;
}

function onListening(): void {

    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + port;
    // eslint-disable-next-line no-console
    console.log('Listening on ' + bind);
}

export default server;