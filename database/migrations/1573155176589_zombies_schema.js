"use strict";

const dateNow = require("../../utils/index");

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ZombiesSchema extends Schema {
  up() {
    this.create("zombies", table => {
      table.string("name", 80);
      table.integer("hit_points").nullable();
      table.integer("brains_eaten").nullable();
      table.integer("speed");
      table.string("turn_date");
      table
        .integer("type_id")
        .references("id")
        .inTable("types")
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
    this.drop("zombies");
  }
}

module.exports = ZombiesSchema;
