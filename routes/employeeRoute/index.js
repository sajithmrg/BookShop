const routes = require('express').Router();
const empController = require('../../controllers/employee.controller')
const utils =require("../../libs/utils")

routes.post("/createEmployee",empController.createEmployee)
routes.get("/loginEmployee",empController.loginEmployee)
routes.get("/getAllEmployees",utils.authMiddleware,empController.getAllEmployees)
routes.put("/updateEmp/:id",empController.updateEmp)
routes.delete("/empDelete/:id",empController.empDelete)
routes.get("/findEmpById/:id",empController.findEmpById)

module.exports = routes;