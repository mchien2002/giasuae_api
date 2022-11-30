const db = require("../../cfg/db.config");
const subjectModel = require("../models/subject_model");
subjectCrt = {};
subjectCrt.find = async (req, res) => {
    await db.query("SELECT * FROM subjects", (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json(data);
        }
    });
}
subjectCrt.create = async (req, res) => {
    var itemSubject = new subjectModel(req.body);
    await db.query("INSERT INTO subjects SET ?", itemSubject, (error, result) => {
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
subjectCrt.deleteByID = async (req, res) => {
    await db.query("DELETE FROM subjects WHERE _id = ?", [req.query._id], (error, result) => {
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
subjectCrt.updateByID = async (req, res) => {
    const item = new subjectModel(req.body);
    await db.query("UPDATE subjects SET ? WHERE _id = ?",
        [item, req.query._id], (error, result) => {
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

module.exports = subjectCrt;