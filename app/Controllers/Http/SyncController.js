"use strict";

const Zombie = use("App/Models/Zombie");
const Weapon = use("App/Models/Weapon");
const Armor = use("App/Models/Armor");

const moment = require("moment");

class SyncController {
  async sync_get({ request, params }) {
    var format = "YYYY-MM-DD HH:mm:ss+00";
    const date = new Date(
      moment(Number(params.date))
        .locale("pt-br")
        .format(format)
    );
    const syncList = {
      weapons: {
        created: await Weapon.query()
          .where("server_created_at", ">", date)
          .fetch(),

        updated: await Weapon.query()
          .where("server_created_at", "<", date)
          .where("server_updated_at", ">=", date)
          .fetch()
      },
      zombies: {
        created: await Zombie.query()
          .where("server_created_at", ">", date)
          .fetch(),
        updated: await Zombie.query()
          .where("server_created_at", "<", date)
          .fetch()
      },
      armors: {
        created: await Armor.query()
          .where("server_created_at", ">", date)
          .fetch(),
        updated: await Armor.query()
          .where("server_created_at", "<", date)
          .fetch()
      }
    };
    return syncList;
  }

  async sync_post({ request, params, response }) {
    return request.all();
  }
}

module.exports = SyncController;
