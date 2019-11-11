"use strict";

const dateNow = require("../../utils/index");

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ZombieWeaponSchema extends Schema {
  up() {
    this.create("zombie_weapons", table => {
      table
        .integer("zombie_id")
        .references("id")
        .inTable("zombies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("weapon_id")
        .references("id")
        .inTable("weapons")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.increments();
      table.timestamp("created_at").defaultTo(dateNow.dateNow());
      table
        .timestamp("updated_at")
        .defaultTo(null)
        .nullable();
    });
  }

  down() {
    this.drop("zombie_weapons");
  }
}

module.exports = ZombieWeaponSchema;
