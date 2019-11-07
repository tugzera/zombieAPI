'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Zombie extends Model {
  armors () {
    return this.hasMany('App/Models/Armor')
  }
  weapons () {
    return this.hasMany('App/Models/Weapon')
  }
  type() {
    return this.belongsTo('App/Models/Type')
  }
}

module.exports = Zombie
