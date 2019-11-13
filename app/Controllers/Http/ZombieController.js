"use strict";

const Zombie = use("App/Models/Zombie");
const Trash = use("App/Models/Trash");

const dateNow = require("../../../utils");

class ZombieController {
  async index({ request, response, view }) {
    const zombies = await Zombie.query()
      .with("type")
      .fetch();
    return zombies;
  }

  async store({ request, response, view }) {
    const data = request.all();
    data.server_created_at = dateNow.dateNow();
    const zombie = await Zombie.create(data);
    return zombie;
  }

  async show({ params }) {
    const zombie = await Zombie.findOrFail(params.id);
    await zombie.load("type");
    return zombie;
  }

  async update({ request, response, view, params }) {
    const zombie = await Zombie.findOrFail(params.id);
    const data = request.all();
    data.server_updated_at = dateNow.dateNow();
    zombie.merge(data);
    zombie.save();
    return zombie;
  }

  async destroy({ request, response, params }) {
    const zombie = await Zombie.findOrFail(params.id);
    const trash = {
      id_deleted: zombie.id,
      column: "armors",
      deleted_at: dateNow.dateNow()
    };
    await Trash.create(trash);
    await zombie.delete();
  }
}

module.exports = ZombieController;
