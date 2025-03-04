/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1967373549")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id = @collection.drivers.admin.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1967373549")

  // update collection data
  unmarshal({
    "listRule": null
  }, collection)

  return app.save(collection)
})
