exports.up = knex => knex.schema.createTable("orders", table =>{
    table.increments('id');
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("total_amount");
    table.integer("status")
    table.timestamp("order_date").default(knex.fn.now());

})

exports.down = knex => knex.schema.dropTable("orders")