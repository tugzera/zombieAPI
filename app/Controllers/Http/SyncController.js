"use strict";

const Zombie = use("App/Models/Zombie");
const Weapon = use("App/Models/Weapon");
const Armor = use("App/Models/Armor");

const moment = require("moment");
const collect = require("collect.js");

const format = "YYYY-MM-DD HH:mm:ss+00";
const dateNow = require("../../../utils");

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
          .where("server_updated_at", ">=", date)
          .fetch()
      },
      armors: {
        created: await Armor.query()
          .where("server_created_at", ">", date)
          .fetch(),
        updated: await Armor.query()
          .where("server_created_at", "<", date)
          .where("server_updated_at", ">=", date)
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
        weapons.created[i].server_created_at = dateNow.dateNow();
        await Weapon.create(weapons.created[i]);
      }
    }
    weapons.updated = collect(weapons.updated).toArray();
    if (weapons.updated.length > 0) {
      for (let i = 0; i < weapons.updated.length; i++) {
        const item = await Weapon.findOrFail(weapons.updated[i].id);
        if (item) {
          weapons.updated[i].server_updated_at = dateNow.dateNow();
          item.merge(weapons.updated[i]);
          item.save();
        }
      }
    }

    const zombies = sync.zombies;
    zombies.created = collect(zombies.created).toArray();
    if (zombies.created.length > 0) {
      for (let i = 0; i < zombies.created.length; i++) {
        zombies.created[i].server_created_at = dateNow.dateNow();
        await Zombie.create(zombies.created[i]);
      }
    }
    zombies.updated = collect(zombies.updated).toArray();
    if (zombies.updated.length > 0) {
      for (let i = 0; i < zombies.updated.length; i++) {
        const item = await Zombie.findOrFail(zombies.updated[i].id);
        if (item) {
          zombies.updated[i].server_updated_at = dateNow.dateNow();
          item.merge(zombies.updated[i]);
          item.save();
        }
      }
    }

    const armors = sync.armors;
    armors.created = collect(armors.created).toArray();
    if (armors.created.length > 0) {
      for (let i = 0; i < armors.created.length; i++) {
        armors.created[i].server_created_at = dateNow.dateNow();
        await Armor.create(armors.created[i]);
      }
    }
    armors.updated = collect(armors.updated).toArray();
    if (armors.updated.length > 0) {
      for (let i = 0; i < armors.updated.length; i++) {
        const item = await Armor.findOrFail(armors.updated[i].id);
        if (item) {
          armors.updated[i].server_updated_at = dateNow.dateNow();
          item.merge(armors.updated[i]);
          item.save();
        }
      }
    }
  }
}

module.exports = SyncController;
