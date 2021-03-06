"use strict";

const dateNow = require("../../../utils");

const Weapon = use("App/Models/Weapon");
const Trash = use("App/Models/Trash");

class WeaponController {
  async index({ request, response, view }) {
    const weapons = await Weapon.all();
    return weapons;
  }

  async store({ request, response, view }) {
    const data = request.all();
    data.server_created_at = dateNow.dateNow();
    const weapon = await Weapon.create(data);
    return weapon;
  }

  async show({ params }) {
    const weapon = await Weapon.findOrFail(params.id);
    return weapon;
  }

  async update({ request, response, view, params }) {
    const weapon = await Weapon.findOrFail(params.id);
    const data = request.all();
    data.server_updated_at = dateNow.dateNow();
    weapon.merge(data);
    weapon.save();
    return weapon;
  }

  async destroy({ request, response, params }) {
    const weapon = await Weapon.findOrFail(params.id);
    const trash = {
      id_deleted: weapon.id,
      column: "weapons",
      deleted_at: dateNow.dateNow()
    };
    await Trash.create(trash);
    await weapon.delete();
  }
}

module.exports = WeaponController;
