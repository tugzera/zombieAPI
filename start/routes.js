'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('zombies', 'ZombieController').apiOnly()
Route.resource('weapons', 'WeaponController').apiOnly()
Route.resource('armors', 'ArmorController').apiOnly()
Route.resource('types', 'TypeController').apiOnly()
Route.get('zombie-weapons/:id', 'ZombieWeaponController.index')
Route.get('zombie-armors/:id', 'ZombieArmorController.index')
Route.post('zombie-armors', 'ZombieArmorController.store')
Route.post('zombie-weapons', 'ZombieWeaponController.store')
Route.get('sync/:date', 'SyncController.sync_get')
Route.post('sync/:date', 'SyncController.sync_post')
