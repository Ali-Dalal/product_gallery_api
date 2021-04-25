import { Request } from 'express';
import City from '@models/city';
import { QueryBuilder, PageQueryBuilder } from 'objection';
import { schemaValidator } from '@helpers/schema_validation';
import * as CitySchema from '@schema/city';

export async function getCities(req: Request): Promise<PageQueryBuilder<QueryBuilder<City, City[]>>> {
    await schemaValidator(CitySchema.getCities, req.query);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { page = 1, filter = {} }: { page: number, filter: { name: string, query: string } } = req.query;
    const { name, query } = filter;
    const cities = City.query()
        .where('enabled', true);
    name && cities.where('name', 'ilike', name);
    query && cities.where('name', 'ilike', `${query}%`);
    return cities
        .orderBy('created_at', 'desc')
        .page(page - 1, 10);
}

export async function getCityWithProductAndRelatedBrochures(req: Request): Promise<QueryBuilder<City, City>> {
    await schemaValidator(CitySchema.getCityWithProductAndRelatedBrochures, req.query);
    const { city_name, product_name } = req.query;
    return City.query().findOne((qb) => {
        qb.where('cities.name', 'ilike', <never>city_name);
    })
        .withGraphJoined('products.brochures')
        .where('products.name', 'ilike', <never>product_name)
        .where('cities.enabled', true)
        .where('products.enabled', true)
        .where('products:brochures.enabled', true)
        .throwIfNotFound();
}
