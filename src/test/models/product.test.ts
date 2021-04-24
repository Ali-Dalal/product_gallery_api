import Product from '@models/product';
import { expect } from 'chai';
import * as faker from 'faker';

describe('Product models test', () => {
    it('should insert a new product', async () => {
        const product = await Product.query().insert({
            name: 'test product',
            description: 'this is a test description for test product',
            enabled: true
        });
        expect(product.slug).to.be.a('string');
        expect(product.id).to.be.a('number');
    });

    it('should fetch a product with related cities', async () => {
        const product = await Product.query().insertGraphAndFetch({
            name: faker.commerce.productName(),
            description: 'this is a test description for test product',
            enabled: true,
            cities: [{
                name: faker.address.city(),
                description: 'a very nice city'
            }]
        });
        expect(product.cities.length).to.be.gt(0);
    });
});
