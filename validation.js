const { number } = require("@hapi/joi");
const joi = require("@hapi/joi");
exports.userRegistrationValidation = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label("firstname").min(4),
    lastName: joi.string().required().label("lastname").min(4),
    email: joi.string().required().label("email"),
    password: joi.string().required().label("password").min(4),
  });
  return schema.validate(data);
};
exports.loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().label("email"),
    password: joi.string().required().label("password").min(4),
  });
  return schema.validate(data);
};
exports.storeCreateValidation = (data) => {
  const schema = joi.object({
    bookType: joi.string().required().label("booktype"),
    qty: joi.number().required().label("qty"),
  });
  return schema.validate(data);
};
exports.orderCreateValidation = (data) => {
  const schema = joi.object({
    userId: joi.string().required().label("userId"),
    bookType: joi.string().required().label("bookType"),
    qty: joi.number().required().label("qty"),
    totalAmount: joi.number().required().label("totalAmount"),
  });
  return schema.validate(data);
};
exports.empValidation = (data) => {
  const schema = joi.object({
    employeeFname: joi.string().required().label("employeeFname").min(4),
    employeeLname: joi.string().required().label("employeeLname").min(4),
    employeeType: joi.string().required().label("employeeType"),
    email: joi.string().required().label("email"),
    password: joi.string().required().label("password").min(4),
  });
  return schema.validate(data);
};
