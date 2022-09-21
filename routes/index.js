const routes = require('express').Router();
const userRoutes = require('./userRoute/index')

routes.use("/book",userRoutes)
module.exports = routes;