"use strict";

const Type = use("App/Models/Type");
const Trash = use("App/Models/Trash");

const dateNow = require("../../../utils");

class TypeController {
  async index({ request, response, view }) {
    const types = await Type.all();
    return types;
  }

  async store({ request, response, view }) {
    const data = request.all();
    data.server_created_at = dateNow.dateNow();
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
    data.server_updated_at = dateNow.dateNow();
    type.merge(data);
    type.save();
    return type;
  }

  async destroy({ request, response, params }) {
    const type = await Type.findOrFail(params.id);
    const trash = {
      id_deleted: type.id,
      column: "types",
      deleted_at: dateNow.dateNow()
    };
    await Trash.create(trash);
    await type.delete();
  }
}

module.exports = TypeController;
