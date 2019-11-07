'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ZombiesSchema extends Schema {
  up () {
    this.create('zombies', (table) => {
      table.string('name', 80)
      table.integer('hit_points').nullable()
      table.integer('brains_eaten').nullable()
      table.integer('speed')
      table.string('turn_date')
      table
      .integer('type_id')
      .references('id')
      .inTable('types')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('zombies')
  }
}

module.exports = ZombiesSchema
