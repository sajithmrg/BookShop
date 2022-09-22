const routes = require('express').Router();
const userRoutes = require('./userRoute/index')
const storeRoutes = require('./storeRoute/index')

routes.use("/book",userRoutes)
routes.use("/book",storeRoutes)
module.exports = routes;