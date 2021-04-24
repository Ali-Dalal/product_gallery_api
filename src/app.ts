import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as path from 'path';

export const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(morgan('short'));
app.use(cors());
app.get('/', (req, res) => {
    res.render('index', {
        title: 'this is a title',
        message: 'this is a message'
    });
});