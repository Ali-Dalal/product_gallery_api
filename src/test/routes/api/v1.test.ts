import { app } from '@/app';
import * as request from 'supertest';
import { expect } from 'chai';

describe('API V1 routes', () => {
    it('Should get city with product and related brochures', async () => {
        const result = await request(app).get('/api/v1/city-product-grid?city_name=berlin&product_name=BMWi8');
        expect(result.status).eq(200);
        expect(result.body.name).eq('Berlin');
        expect(result.body.products).to.be.an('array');
        expect(result.body.products[0].name).eq('BMWi8');
        expect(result.body.products[0].brochures).to.be.an('array');
    });
});