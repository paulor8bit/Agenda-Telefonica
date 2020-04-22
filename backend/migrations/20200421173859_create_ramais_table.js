exports.up = function(knex, Promise) {
    return knex.schema.createTable('ramais', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('setor').notNull()
        table.string('telefoneum').notNull()
        table.string('telefonedois', 1000)
        table.string('emailcop', 1000)
                        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('ramais')
};

  