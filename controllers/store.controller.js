const storeModel = require('../models/order.models')
const {storeCreateValidation} = require('../validation')

exports.createStore = async (req,res) =>{
    try {
        const body = req.body
        const {error} = storeCreateValidation({
            ...body,
        })
        if (error) {
            return res.status(200).json({
              code: 200,
              success: false,
              message: error.details[0].message,
            });
          }
    } catch (error) {
        
    }
}