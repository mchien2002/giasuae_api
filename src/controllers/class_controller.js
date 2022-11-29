const db = require('../../cfg/db.config');
const classCtrl = {};
const classModel = require('../models/class_model');
classCtrl.find = async (req, res) => {
    await db.query("SELECT * FROM classes", (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json(data);
        }
    })
}
classCtrl.create = async (req, res) => {
    var itemClass = new classModel(req.body);
    await db.query("INSERT INTO classes SET ?", itemClass, (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json("Successful");
        }
    })
}

classCtrl.deleteByID = async (req, res) => {
    await db.query("DELETE FROM classes  WHERE _id = ?", [req.query._id], (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json("Successful");
        }
    })
}

classCtrl.updateByID = async (req, res) => {
    await db.query("UPDATE classes SET name = ? WHERE _id = ?", [req.body.name, req.query._id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json("Successful");
        }
    })
}

module.exports = classCtrl;