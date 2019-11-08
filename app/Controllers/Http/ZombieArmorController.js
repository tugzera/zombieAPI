'use strict'

const Zombie = use("App/Models/Zombie");

class ZombieArmorController {
  async index ({request, params, view}) {
    const zombie = await Zombie.query().where('id', params.id)
    .with("armor")
    .fetch();
    return zombie
  }
  async store({request, params, view}) {
    const data = request.all();
    const zombie = await Zombie.findOrFail(data.zombie_id);

    return  zombie.armor().attach([data.armor_id])
  }
}

module.exports = ZombieArmorController
