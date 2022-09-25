const orderModel = require("../models/order.models");
const { orderCreateValidation } = require("../validation");
const storeModel = require("../models/store.models");

exports.createOrder = async (req, res) => {
  try {
    const body = req.body;
    const { error } = orderCreateValidation({
      ...body,
    });
    if (error) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    }
    const newOrder = new orderModel({
      userId: req.body.userId,
      bookType: req.body.bookType,
      qty: req.body.qty,
      totalAmount: req.body.totalAmount,
    });
    const order = await newOrder.save();

    const bType = req.body.bookType;
    const storeData = await storeModel.find({
      bookType: bType,
    });

    const sData = storeData[0].qty;
    const bData = req.body.qty;

    const newData = sData - bData;
    
    const storeData2 = await storeModel.findOneAndUpdate(
      {
        bookType: bType,
      },
      { $set: { qty: newData } }
    );
      console.log(storeData2)
    if (order && storeData2) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: order,
        message: "order create successfuly",
      });
    } else {
      return res.status(400).json({
        code: 400,
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
exports.allOrders = async (req, res) => {
  try {
    const order = await orderModel.find();
    if (order) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: order,
        message: "Find all orders",
      });
    } else {
      return res.status(400).json({
        code: 400,
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
exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const newOrder = {
      userId: req.body.userId,
      bookType: req.body.bookType,
      qty: req.body.qty,
      totalAmount: req.body.totalAmount,
    };
    const order = await orderModel.findByIdAndUpdate(id, newOrder, {
      new: true,
    });
    if (order) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "Order Updated",
        data: order,
      });
    } else {
      return res.status(400).json({
        code: 400,
        success: false,
        status: "bad request",
        message: "Invalied order id",
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
exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await orderModel.findByIdAndDelete(id);
    if (del) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: ` ${id} order deleted`,
      });
    } else {
      return res.status(400).json({
        code: 400,
        success: false,
        status: "bad request",
        message: "Invalied order id",
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
exports.findOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const forder = await orderModel.findById(id);
    if (forder) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "record find",
        data: forder,
      });
    } else {
      return res.status(400).json({
        code: 400,
        success: false,
        status: "bad request",
        message: "Invalied order id",
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
exports.findSameUserIdOrder = async (req, res) => {
  try {
    var userId = req.body.userId;
    orderModel
      .find({
        userId: userId,
      })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            code: 200,
            success: true,
            status: "OK",
            message: "record find",
            data: data,
          });
        } else {
          return res.status(400).json({
            code: 400,
            success: false,
            status: "bad request",
            message: "Invalied user id",
          });
        }
      });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      success: false,
      status: "Internal server error",
      message: error.message,
    });
  }
};
