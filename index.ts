import Server from './src/bin/www';
import configuration from '@config';
import * as Logger from '@logger';

const port = configuration.PORT;

Server.listen(Number(port), '0.0.0.0', async () => {
    Logger.write(`Service started on port ${port}`);
});
