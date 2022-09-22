const employeeModel = require("../models/employee.models");
const { empValidation } = require("../validation");
const { loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const utils = require("../libs/utils");

exports.createEmployee = async (req, res) => {
  try {
    const body = req.body;
    const { error } = empValidation({
      ...body,
    });
    if (error) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    }
    const checkemail = await employeeModel.findOne({
      email: req.body.email,
    });
    if (checkemail) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "email already available",
      });
    }
    const newEmployee = new employeeModel({
      employeeFname: req.body.employeeFname,
      employeeLname: req.body.employeeLname,
      employeeType: req.body.employeeType,
      email: req.body.email,
      password: req.body.password,
    });
    const newEmp = await newEmployee.save();
    //token create
    const token = utils.generateAuthToken(newEmp);
    if (newEmp) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        token: token.token,
        expireIn: token.expires,
        data: token.sub,
        message: "cerate employee successfuly",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "Bad request",
        message: "Not success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal server error",
      message: error.message,
    });
  }
};
exports.loginEmployee = async (req, res) => {
  try {
    const body = req.body;
    const { error } = loginValidation({
      ...body,
    });
    if (error) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await employeeModel
      .findOne({
        email,
      })
      .select("+password");
    if (!user) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "not valied user",
      });
    }
    //create token
    const token = utils.generateAuthToken(user);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: `invalied password with this email:${email}`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        token: token.token,
        expireIn: token.expires,
        data: token.sub,
        message: "user found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal server error",
      message: error.message,
    });
  }
};
exports.getAllEmployees = async (req, res) => {
  try {
    const allemp = await employeeModel.find();
    if (allemp) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "employees found",
        data: allemp,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "not valied employee",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal server error",
      message: error.message,
    });
  }
};
exports.updateEmp = async (req, res) => {
  try {
    const id = req.params.id;
    //update password hashing
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const newEmp = {
      employeeFname: req.body.employeeFname,
      employeeLname: req.body.employeeLname,
      employeeType: req.body.employeeType,
      email: req.body.email,
      password: req.body.password,
    };
    const updateEmp = await employeeModel.findByIdAndUpdate(id, newEmp, {
      new: true,
    });
    if (updateEmp) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "employee Updated",
        data: updateEmp,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "Invalied employee id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "internal server error",
      message: error.message,
    });
  }
};
exports.empDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const delemp = await employeeModel.findByIdAndDelete(id);
    if (delemp) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "employee deleted",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        status: "bad request",
        message: "Invalied employee id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "internal server error",
      message: error.message,
    });
  }
};
exports.findEmpById = async (req,res) =>{
    try {
        const id = req.params.id;
        const findId = await employeeModel.findById(id);
        if (findId) {
            return res.status(200).json({
              code: 200,
              success: true,
              status: "OK",
              data:findId,
              message: "employee found",
            });
          } else {
            return res.status(200).json({
              code: 200,
              success: false,
              status: "bad request",
              message: "Invalied employee id",
            });
          }
    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            status: "internal server error",
            message: error.message,
          });
    }
}


