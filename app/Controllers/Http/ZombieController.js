"use strict";

const Zombie = use("App/Models/Zombie");

class ZombieController {
  async index({ request, response, view }) {
    const zombies = await Zombie.query()
      .with("type")
      .fetch();
    return zombies;
  }

  async store({ request, response, view }) {
    const data = request.all();
    const zombie = await Zombie.create(data);
    return zombie;
  }

  async show({ params }) {
    const zombie = await Zombie.findOrFail(params.id)
    await zombie.load('type')
    return zombie
  }

  async update({request, response, view, params}) {
    const zombie = await Zombie.findOrFail(params.id)
    const data = request.all()
    zombie.merge(data)
    zombie.save()
    return zombie
  }

  async destroy({request, response, params})
  {
    const zombie = await Zombie.findOrFail(params.id)
    await zombie.delete()
  }
}

module.exports = ZombieController;
