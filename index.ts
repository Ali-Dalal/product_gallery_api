import Server from './src/bin/www';
import configuration from '@config';
import configBuilder from '@config/builder';
import * as Logger from '@logger';

const port = configuration.PORT;

(async (): Promise<void> => {
    await configBuilder();
    Server.listen(Number(port), '0.0.0.0', async () => {
        Logger.write(`Service started on port ${port}`);
    });
})();