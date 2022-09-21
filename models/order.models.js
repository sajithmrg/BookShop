const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bookType: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("order", orderSchema);
