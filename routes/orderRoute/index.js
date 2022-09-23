const routes = require('express').Router();
const orderController = require('../../controllers/order.controller');

routes.post("/createOrder",orderController.createOrder)
routes.get("/allOrders",orderController.allOrders)
routes.put("/updateOrder/:id",orderController.updateOrder)
routes.delete("/deleteOrder/:id",orderController.deleteOrder)
routes.get("/findOrder/:id",orderController.findOrder)
routes.get("/findSameUserIdOrder",orderController.findSameUserIdOrder)

module.exports = routes;