'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ZombieArmorSchema extends Schema {
  up () {
    this.create('zombie_armors', (table) => {
      table
      .integer('zombie_id')
      .references('id')
      .inTable('zombies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      table
      .integer('armor_id')
      .references('id')
      .inTable('armors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('zombie_armors')
  }
}

module.exports = ZombieArmorSchema
