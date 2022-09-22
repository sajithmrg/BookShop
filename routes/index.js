const routes = require('express').Router();
const userRoutes = require('./userRoute/index')
const storeRoutes = require('./storeRoute/index')
const orderRoutes = require('./orderRoute/index')

routes.use("/book",userRoutes)
routes.use("/book",storeRoutes)
routes.use("/book",orderRoutes)
module.exports = routes;