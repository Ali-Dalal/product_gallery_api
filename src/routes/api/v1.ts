import * as express from 'express';
import { getCities, getCityWithProductAndRelatedBrochures } from '@controllers//api/v1/cities';
import { expressCallback } from '@helpers/express';

const apiV1Routes = express.Router();

apiV1Routes.get('/city-product-grid', expressCallback(getCityWithProductAndRelatedBrochures));
apiV1Routes.get('/cities', expressCallback(getCities));

export default apiV1Routes;