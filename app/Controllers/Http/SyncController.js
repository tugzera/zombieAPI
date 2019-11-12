"use strict";

const Zombie = use("App/Models/Zombie");
const Weapon = use("App/Models/Weapon");
const Armor = use("App/Models/Armor");

const moment = require("moment");
const collect = require("collect.js");

const format = "YYYY-MM-DD HH:mm:ss+00";

class SyncController {
  async sync_get({ request, params }) {
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
    const sync = request.all();
    const weapons = sync.weapons;
    weapons.created = collect(weapons.created).toArray();
    if (weapons.created.length > 0) {
      for (let i = 0; i < weapons.created.length; i++) {
        weapons.created[i].server_created_at = new Date(
          moment(Date.now())
            .locale("pt-br")
            .format(format)
        );
        await Weapon.create(weapons.created[i])
      }
    }
    weapons.updated = collect(weapons.updated).toArray();
    if (weapons.updated.length > 0) {
      for (let i = 0; i < weapons.updated.length; i++) {
        const item = await Weapon.findOrFail(weapons.updated[i].id);
        if(item) {
          weapons.updated[i].server_updated_at =  new Date(
              moment(Date.now())
                .locale("pt-br")
                .format(format)
            );
          item.merge(weapons.updated[i]);
          item.save()
        }
      }
    }
  }
}

module.exports = SyncController;
