'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ZombieWeaponSchema extends Schema {
  up () {
    this.create('zombie_weapons', (table) => {
      table
      .integer('zombie_id')
      .references('id')
      .inTable('zombies')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('weapon_id')
      .references('id')
      .inTable('weapons')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('zombie_weapons')
  }
}

module.exports = ZombieWeaponSchema
