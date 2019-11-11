"use strict";

const dateNow = require("../../../utils");

const Type = use("App/Models/Type");

class TypeController {
  async index({ request, response, view }) {
    const types = await Type.all();
    return types;
  }

  async store({ request, response, view }) {
    const data = request.all();
    const type = await Type.create(data);
    return type;
  }

  async show({ params }) {
    const type = await Type.findOrFail(params.id);
    return type;
  }

  async update({ request, response, view, params }) {
    const type = await Type.findOrFail(params.id);
    const data = request.all();
    type.merge(data);
    type.updated_at = dateNow.dateNow();
    type.save();
    return type;
  }

  async destroy({ request, response, params }) {
    const type = await Type.findOrFail(params.id);
    await type.delete();
  }
}

module.exports = TypeController;
