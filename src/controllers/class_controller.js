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
    trigBeforeDelClass(req, res, async () => {
        await db.query("DELETE FROM classes WHERE _id = ?", [req.query._id], (error, data) => {
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
    })
}

classCtrl.updateByID = async (req, res) => {
    const item = new classModel(req.body);
    await db.query("UPDATE classes SET ? WHERE _id = ?", [item, req.query._id], (error, result) => {
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

async function trigBeforeDelClass(req, res, result) {
    await db.query("DELETE FROM classes_of_newclass WHERE _id_class = ?; DELETE FROM classes_of_tutor WHERE _id_class = ?;",
        [req.query._id, req.query._id], (err, res) => {
            if (err) {
                console.log(err.message);
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong"
                })
            } else {
                result();
            }
        })
}

module.exports = classCtrl;