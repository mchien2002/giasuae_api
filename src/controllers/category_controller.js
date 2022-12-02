const db = require("../../cfg/db.config");
const categoryModel = require("../models/category_models");
categoryCtr = {};
categoryCtr.find = async (req, res) => {
    await db.query("SELECT * FROM categories", (error, data) => {
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
categoryCtr.create = async (req, res) => {
    var itemCategory = new categoryModel(req.body);
    await db.query("INSERT INTO categories SET ?", itemCategory, (error, result) => {
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
categoryCtr.deleteByID = async (req, res) => {
    trigBeforeDelCategry(req, res, async () => {
        await db.query("DELETE FROM categories  WHERE _id = ?", [req.query._id], (error, result) => {
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
categoryCtr.updateByID = async (req, res) => {
    const item = new categoryModel(req.body);
    await db.query("UPDATE categories SET ? WHERE _id = ?",
        [item, req.body.style, req.query._id], (error, result) => {
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

async function trigBeforeDelCategry(req, res, result) {
    await db.query("DELETE FROM categories_of_newclass WHERE _id_category = ?; DELETE FROM salaryinfos WHERE _id_category = ?;",
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

module.exports = categoryCtr;