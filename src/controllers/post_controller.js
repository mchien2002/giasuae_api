const db = require("../../cfg/db.config");
const postModel = require("../models/post_model");

const postCtr = {};

postCtr.find = async (req, res) => {
    await db.query("SELECT * FROM posts", (err, result) => {
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
postCtr.filter = async (req, res) => {
    await db.query("SELECT * FROM posts WHERE style = ? OR _id = ?", [req.query.style, req.query._id], (err, result) => {
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
postCtr.create = async (req, res) => {
    const itemP = new postModel(req.body);
    await db.query("INSERT INTO posts SET ?", itemP, (err, result) => {
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
postCtr.updateByID = async (req, res) => {
    const item = new postModel(req.body);
    await db.query("UPDATE posts SET ? WHERE _id = ?", [item, req.query._id], (error, result) => {
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
postCtr.deleteByID = async (req, res) => {
    await db.query("DELETE FROM posts WHERE _id = ?", [req.query._id], (error, data) => {
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
module.exports = postCtr;
