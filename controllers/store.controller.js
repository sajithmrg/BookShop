const storeModel = require("../models/store.models");
const { storeCreateValidation } = require("../validation");

exports.createStore = async (req, res) => {
  try {
    const body = req.body;
    const { error } = storeCreateValidation({
      ...body,
    });
    if (error) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    }
    const newStore = new storeModel({
      bookType: req.body.bookType,
      qty: req.body.qty,
    });
    const store = await newStore.save();

    if (store) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: store,
        message: "Add record successfuly",
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
exports.getAllrecords = async (req, res) => {
  try {
    const store = await storeModel.find();
    if (store) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: store,
        message: "Find all users",
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
exports.updateStore = async (req, res) => {
  try {
    const id = req.params.id;
    const newRecord = {
      bookType: req.body.bookType,
      qty: req.body.qty,
    };
    const store = await storeModel.findByIdAndUpdate(id, newRecord, {
      new: true,
    });
    console.log(store);
    if (store) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: store,
        message: "store update successfully",
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
exports.deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const deletestore = await storeModel.findByIdAndDelete(id);
    if (deletestore) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: ` ${id} record deleted`,
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
exports.findRecord = async (req, res) => {
  try {
    const id = req.params.id;

    const record = await storeModel.findById(id);
    if (record) {
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        message: "record find",
        data: record,
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
