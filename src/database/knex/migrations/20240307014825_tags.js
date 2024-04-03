exports.up = knex => knex.schema.createTable("tags", table =>{
    table.increments('id');
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE")
    table.text("title");
})

exports.down = knex => knex.schema.dropTable("tags")