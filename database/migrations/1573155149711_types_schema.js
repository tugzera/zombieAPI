"use strict";

const dateNow = require("../../utils/index");

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TypesSchema extends Schema {
  up() {
    this.create("types", table => {
      table.string("name");
      table.string("abilities");
      table.increments();
      table.timestamp("created_at").defaultTo(dateNow.dateNow());
      table
        .timestamp("updated_at")
        .defaultTo(null)
        .nullable();
    });
  }

  down() {
    this.drop("types");
  }
}

module.exports = TypesSchema;
