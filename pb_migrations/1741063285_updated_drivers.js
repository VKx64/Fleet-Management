/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1967373549")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = @collection.drivers.admin.id",
    "deleteRule": "@request.auth.id = @collection.drivers.admin.id",
    "updateRule": "@request.auth.id = @collection.drivers.admin.id",
    "viewRule": "@request.auth.id = @collection.drivers.admin.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1967373549")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
