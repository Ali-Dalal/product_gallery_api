import Model from './base';
import { RelationMapping } from 'objection';
import Product from './product';
import slugify from 'slugify';

export default class City extends Model {
    static tableName = 'cities';
    id!: number;
    name!: string;
    slug!: string;
    description!: string;
    enabled!: boolean;
    created_at!: string;
    updated_at!: string;

    static getTableName(): string {
        return this.tableName;
    }

    async $beforeInsert(): Promise<void> {
        this.created_at = new Date().toISOString();
        await this.generateUniqueSlut();
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

    static relationMappings(): { products: RelationMapping<Product> } {
        return {
            products: {
                relation: Model.ManyToManyRelation,
                modelClass: Product,
                join: {
                    from: 'cities.id',
                    through: {
                        from: 'cities_products.city_id',
                        to: 'cities_products.product_id'
                    },
                    to: 'products.id'
                }
            }
        };
    }
}