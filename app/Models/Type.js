'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  zombie() {
    return this.belongsTo('App/Models/Zombie')
  }
}

module.exports = Type
