    exports.up = knex => knex.schema.createTable("orders_details", table =>{
    table.increments('id');
    table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
    table.integer("quantity")
    table.integer("subtotal_amount")

})


exports.down = knex => knex.schema.dropTable("order_details")