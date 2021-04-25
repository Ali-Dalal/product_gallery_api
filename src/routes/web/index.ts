import * as express from 'express';
import { getCitiesWithProductAndBrochures } from '@controllers/cities';

const webRoutes = express.Router();

webRoutes.get('/:city_slug/:product_slug', getCitiesWithProductAndBrochures);

export default webRoutes;