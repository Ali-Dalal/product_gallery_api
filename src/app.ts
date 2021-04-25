import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import ApiV1Routes from '@routes/api/v1';

export const app = express();
app.use(express.static('public'));
app.use(morgan('short'));
app.use(cors());

app.use('/api/v1', ApiV1Routes);

app.all('*', function (req, res) {
    res.status(404).send('not found');
});