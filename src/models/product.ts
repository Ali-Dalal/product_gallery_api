import Model from './base';
import City from './city';
import { RelationMapping } from 'objection';
import slugify from 'slugify';

export default class Product extends Model {
    static tableName = 'products';
    id!: number;
    name!: string;
    slug!: string;
    description!: string;
    enabled!: boolean;
    created_at!: string;
    updated_at!: string;
    cities!: City[]

    static getTableName(): string {
        return this.tableName;
    }

    async $beforeInsert(): Promise<void> {
        await this.generateUniqueSlut();
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate(): void {
        this.updated_at = new Date().toISOString();
    }

    async generateUniqueSlut(): Promise<void> {
        const { name } = this;
        const tmpSlug = slugify(name);
        const similarSlugs = await Product.query().where('slug', 'like', `${tmpSlug}%`);
        this.slug = similarSlugs.length ? `${tmpSlug}-${similarSlugs.length + 1}` : tmpSlug;
    }

    static relationMappings(): { cities: RelationMapping<City> } {
        return {
            cities: {
                relation: Model.ManyToManyRelation,
                modelClass: City,
                join: {
                    from: 'products.id',
                    through: {
                        from: 'cities_products.product_id',
                        to: 'cities_products.city_id'
                    },
                    to: 'cities.id'
                }
            }
        };
    }
}