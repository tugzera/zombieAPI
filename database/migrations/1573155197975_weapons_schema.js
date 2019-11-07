
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WeaponsSchema extends Schema {
  up () {
    this.create('weapons', (table) => {
      table.string('name')
      table.string('bullets')
      table.integer('attack_points').nullable()
      table.integer('durability')
      table.integer('price')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('weapons')
  }
}

module.exports = WeaponsSchema
