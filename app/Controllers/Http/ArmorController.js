"use strict";

const dateNow = require("../../../utils");
const Trash = use('App/Models/Trash');

const Armor = use("App/Models/Armor");

class ArmorController {
  async index({ request, response, view }) {
    const armors = await Armor.all();
    return armors;
  }

  async store({ request, response, view }) {
    const data = request.all();
    data.server_created_at = dateNow.dateNow();
    const armor = await Armor.create(data);
    return armor;
  }

  async show({ params }) {
    const armor = await Armor.findOrFail(params.id);
    return armor;
  }

  async update({ request, response, view, params }) {
    const armor = await Armor.findOrFail(params.id);
    const data = request.all();
    data.server_updated_at = dateNow.dateNow();
    armor.merge(data);
    armor.save();
    return armor;
  }

  async destroy({ request, response, params }) {
    const armor = await Armor.findOrFail(params.id);
    const trash = {
      id_deleted: armor.id,
      column: "armors",
      deleted_at: dateNow.dateNow()
    };
    await Trash.create(trash);
    await armor.delete();
  }
}

module.exports = ArmorController;
