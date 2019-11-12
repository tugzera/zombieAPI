"use strict";

const Zombie = use("App/Models/Zombie");
const Weapon = use("App/Models/Weapon");
const Armor = use("App/Models/Armor");

const moment = require("moment");

class SyncController {
  async sync_controller({ request, params }) {
    var format = "YYYY-MM-DD HH:mm:ss+00";
    const date = new Date(
      moment(Number(params.date))
        .locale("pt-br")
        .format(format)
    );
    console.log(Date.now())
    const syncList = {
      weapon: {
        created: await Weapon.query()
          .where("server_created_at", ">", date)
          .fetch(),

        updated: await Weapon.query()
          .where("server_created_at", "<", date)
          .where('server_updated_at', '>=', date)
          .fetch()
      },
      zombie: {
        created: await Zombie.query()
          .where("server_created_at", ">", date)
          .fetch(),
        updated: await Zombie.query()
          .where("server_created_at", "<", date)
          .fetch()
      },
      armor: {
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
}

module.exports = SyncController;
