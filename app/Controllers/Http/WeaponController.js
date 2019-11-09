'use strict'

const Weapon = use('App/Models/Weapon');

class WeaponController {
  async index({ request, response, view }) {
    const weapons = await Weapon.all()
    return weapons;
  }

  async store({ request, response, view }) {
    const data = request.all();
    const weapon = await Weapon.create(data);
    return weapon;
  }

  async show({ params }) {
    const weapon = await Weapon.findOrFail(params.id)
    const x = weapon.created_at
    return weapon
  }

  async update({request, response, view, params}) {
    const weapon = await Weapon.findOrFail(params.id)
    const data = request.all()
    weapon.merge(data)
    weapon.save()
    return weapon
  }

  async destroy({request, response, params})
  {
    const weapon = await Weapon.findOrFail(params.id)
    await weapon.delete()
  }
}

module.exports = WeaponController
