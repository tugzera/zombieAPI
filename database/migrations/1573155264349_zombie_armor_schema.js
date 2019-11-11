"use strict";

const dateNow = require("../../utils/index");

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ZombieArmorSchema extends Schema {
  up() {
    this.create("zombie_armors", table => {
      table
        .integer("zombie_id")
        .references("id")
        .inTable("zombies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table;
      table
        .integer("armor_id")
        .references("id")
        .inTable("armors")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table;
      table.increments();
      table.timestamp("created_at").defaultTo(dateNow.dateNow());
      table
        .timestamp("updated_at")
        .defaultTo(null)
        .nullable();
    });
  }

  down() {
    this.drop("zombie_armors");
  }
}

module.exports = ZombieArmorSchema;
