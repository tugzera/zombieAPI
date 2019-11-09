"use strict";

const Zombie = use("App/Models/Zombie");
const Weapon = use("App/Models/Weapon");
const Armor = use("App/Models/Armor");

class SyncController {
  async sync_controller({ request, params }) {
    const time = params.date;
    const date = new Date(Number(time)).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo'});


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
        created: await Zombie.query().where('created_at', '>', date).fetch(),
        updated: await Zombie.query().where('updated_at', '>', date).fetch()
      },
      armor: {
        created: await Armor.query().where('created_at', '>', date).fetch(),
        updated: await Armor.query().where('updated_at', '>', date).fetch()
      }
    };

    return syncList
  }

}

module.exports = SyncController;
