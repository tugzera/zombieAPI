"use strict";

const Zombie = use("App/Models/Zombie");
const Weapon = use("App/Models/Weapon");
const Armor = use("App/Models/Armor");

const moment = require("moment");

class SyncController {
  async sync_controller({ request, params }) {
    var format = "YYYY-MM-DD HH:mm:ss+00";
    const date = new Date(
      moment(Date.now())
        .locale("pt-br")
        .format(format)
    )
    const syncList = {
      weapon: {
        created: await Weapon.query()
          .where("created_at", ">", date)
          .fetch(),

        updated: await Weapon.query()
          .where("updated_at", ">", date)
          .fetch()
      },
      zombie: {
        created: await Zombie.query()
          .where("created_at", ">", date)
          .fetch(),
        updated: await Zombie.query()
          .where("updated_at", ">", date)
          .fetch()
      },
      armor: {
        created: await Armor.query()
          .where("created_at", ">", date)
          .fetch(),
        updated: await Armor.query()
          .where("updated_at", ">", date)
          .fetch()
      },
    };
    return syncList;
  }
}

module.exports = SyncController;
