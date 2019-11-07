"use strict";

const Zombie = use("App/Models/Zombie");

class ZombieWeaponController {
  async index ({request, params, view}) {
    const zombie = await Zombie.query().where('id', params.id)
    .with("weapon")
    .fetch();
    return zombie
  }
}

module.exports = ZombieWeaponController;
