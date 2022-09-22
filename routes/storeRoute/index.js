const routes = require("express").Router();
const storeController = require("../../controllers/store.controller");

routes.post("/createStore",storeController.createStore)
routes.get("/getAllrecords",storeController.getAllrecords)
routes.put("/updateStore/:id",storeController.updateStore)
routes.delete("/deleteRecord/:id",storeController.deleteRecord)
routes.get("/findRecord/:id",storeController.findRecord)

module.exports = routes;