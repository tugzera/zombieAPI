"use strict";

const Zombie = use("App/Models/Zombie");

class ZombieWeaponController {
  async index ({request, params, view}) {
    const zombie = await Zombie.query().where('id', params.id)
    .with("weapon")
    .fetch();
    return zombie
  }
  async store({request, params, view}) {
    const data = request.all();
    const zombie = await Zombie.findOrFail(data.zombie_id);
    return  zombie.weapon().attach([data.weapon_id])
  }
}

module.exports = ZombieWeaponController;
