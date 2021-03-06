import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('slug').index().unique();
        table.string('img_url');
        table.text('description');
        table.boolean('enabled').defaultTo(true).index();
        table.timestamp('created_at');
        table.timestamp('updated_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products');
}

