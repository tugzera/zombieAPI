'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArmorsSchema extends Schema {
  up () {
    this.create('armors', (table) => {
      table.string('name')
      table.integer('defense_points').nullable()
      table.integer('durability')
      table.integer('price')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('armors')
  }
}

module.exports = ArmorsSchema
