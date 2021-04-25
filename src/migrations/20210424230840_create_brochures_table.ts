import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('brochures', (table) => {
        table.increments('id').primary();
        table.integer('product_id').unsigned().index().references('products.id').onDelete('cascade');
        table.string('name');
        table.string('slug').index().unique();
        table.string('brochure_url');
        table.text('description');
        table.boolean('enabled').defaultTo(true).index();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('brochures');
}

