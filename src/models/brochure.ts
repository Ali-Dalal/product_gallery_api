import Model from './base';
import Product from './product';
import { RelationMapping } from 'objection';
import slugify from 'slugify';

export default class Brochure extends Model {
    static tableName = 'brochures';
    id!: number;
    name!: string;
    slug!: string;
    img_url!: string;
    description!: string;
    enabled!: boolean;
    created_at!: string;
    updated_at!: string;
    product!: Product

    static getTableName(): string {
        return this.tableName;
    }

    async $beforeInsert(): Promise<void> {
        await this.generateUniqueSlug();
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate(): void {
        this.updated_at = new Date().toISOString();
    }

    async generateUniqueSlug(): Promise<void> {
        const { name } = this;
        const tmpSlug = slugify(name, {
            lower: true
        });
        const similarSlugs = await Product.query().where('slug', 'like', `${tmpSlug}%`);
        this.slug = similarSlugs.length ? `${tmpSlug}-${similarSlugs.length + 1}` : tmpSlug;
    }

    static relationMappings(): { product: RelationMapping<Product> } {
        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'brochures.product_id',
                    to: 'products.id'
                }
            }
        };
    }
}