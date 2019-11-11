"use strict";

const dateNow = require("../../../utils");

const Armor = use("App/Models/Armor");

class ArmorController {
  async index({ request, response, view }) {
    const armors = await Armor.all();
    return armors;
  }

  async store({ request, response, view }) {
    const data = request.all();
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
    armor.merge(data);
    armor.update_at = dateNow.dateNow();
    armor.save();
    return armor;
  }

  async destroy({ request, response, params }) {
    const armor = await Armor.findOrFail(params.id);
    await armor.delete();
  }
}

module.exports = ArmorController;
