"use strict";

const { dateNow } = require("../../utils");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Weapon extends Model {}

module.exports = Weapon;
