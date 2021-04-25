import * as Knex from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cities_products', (table) => {
        table.integer('city_id').unsigned().references('cities.id').notNullable().index().onDelete('cascade');
        table.integer('product_id').unsigned().references('products.id').notNullable().index().onDelete('cascade');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cities_products');
}

