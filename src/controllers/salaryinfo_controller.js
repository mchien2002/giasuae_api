const db = require("../../cfg/db.config");
const salaryinfoModel = require("../models/salaryinfo_model");

const salaryCtr = {};

salaryCtr.find = async (req, res) => {
    await db.query("SELECT * FROM salaryinfos", (err, result) => {
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
salaryCtr.filter = async (req, res) => {
    await db.query("SELECT * FROM salaryinfos WHERE styleTeacher = ? OR _id = ?", [req.query.styleTeacher, req.query._id], (err, result) => {
        if (err) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            });
        } else {
            req.query._id ? res.status(200).json(result[0]) : res.status(200).json(result);
        }
    })
}
salaryCtr.create = async (req, res) => {
    const itemP = new salaryinfoModel(req.body);
    await db.query("INSERT INTO salaryinfos SET ?", itemP, (err, result) => {
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
salaryCtr.updateByID = async (req, res) => {
    const item = new salaryinfoModel(req.body);
    await db.query("UPDATE salaryinfos SET ? WHERE _id = ?", [item, req.query._id], (error, result) => {
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
salaryCtr.deleteByID = async (req, res) => {
    await db.query("DELETE FROM salaryinfos WHERE _id = ?", [req.query._id], (error, data) => {
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
module.exports = salaryCtr;
