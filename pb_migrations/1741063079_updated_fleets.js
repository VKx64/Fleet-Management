/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3288676456")

  // update collection data
  unmarshal({
    "createRule": "",
    "listRule": "",
    "updateRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("relation291929305")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1967373549",
    "hidden": false,
    "id": "relation3826303751",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "drivers",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3288676456")

  // update collection data
  unmarshal({
    "createRule": "@collection.users.role = 'driver'",
    "listRule": "@request.auth.role = 'admin' || @request.auth.id = @collection.fleets.driver.id",
    "updateRule": "@collection.users.role = 'driver'"
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation291929305",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "driver",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation3826303751")

  return app.save(collection)
})
