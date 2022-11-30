const transactionModel = require('../models/transaction_model');
const db = require("../../cfg/db.config");

const transCrt = {};
transCrt.find = async(req, res) =>{
    await db.query("SELECT * FROM transactionhistories", (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            });
        } else {
            return res.status(200).json(result);
        }
    })
}
transCrt.create = async (req, res) => {
    const item = new transactionModel(req.body);
    await db.query("INSERT INTO transactionhistories SET ?", item, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            });
        } else {
            return res.status(200).json("Successful");
        }
    })
}
module.exports = transCrt;