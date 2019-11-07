'use strict'

const Zombie = use("App/Models/Zombie");

class ZombieArmorController {
  async index ({request, params, view}) {
    const zombie = await Zombie.query().where('id', params.id)
    .with("armor")
    .fetch();
    return zombie
  }
}

module.exports = ZombieArmorController
