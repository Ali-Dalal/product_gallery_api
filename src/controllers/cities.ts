import { Response, Request } from 'express';
import City from '@models/city';

export async function getCitiesWithProductAndBrochures(req: Request, res: Response): Promise<void> {
    const { city_slug, product_slug } = req.params;
    const cityWithProductAndBrochures = await City.query().findOne({
        'cities.slug': city_slug
    }).withGraphJoined('products.brochures').where('products.slug', product_slug);
    res.json(cityWithProductAndBrochures);
}