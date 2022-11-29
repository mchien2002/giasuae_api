const db = require('../../cfg/db.config');
const newClassModel = require('../models/newclass_model');
const newClassCtrl = {};

newClassCtrl.find = async (req, res) => {
    await db.query("SELECT * FROM view_newclasses", (error, data) => {
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

newClassCtrl.create = async (req, res) => {
    const itemNC = new newClassModel(req.body);
    await db.query("INSERT INTO newclasses SET ?", itemNC, async (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong",
            })
        } else {
            try {
                req.body.classes ? await db.query("INSERT INTO classes_of_newclass(_id_newclass, _id_class) VALUES ?",
                    [req.body.classes.map((item) => [data.insertId, parseInt(item)])]) : null;
                req.body.subjects ? await db.query("INSERT INTO subjects_of_newclass(_id_newclass, _id_subject) VALUES ?",
                    [req.body.subjects.map((item) => [data.insertId, parseInt(item)])]) : null;
                req.body.categories ? await db.query("INSERT INTO categories_of_newclass(_id_newclass, _id_category) VALUES ?",
                    [req.body.categories.map((item) => [data.insertId, parseInt(item)])]) : null;
                return res.status(200).json("Successful");
            } catch (error) {
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong",
                })
            }
        }
    });
}

newClassCtrl.deleteByID = async (req, res) => {
    await db.query("DELETE FROM newclasses  WHERE _id = ?", [req.query._id], (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json("Successful");
        }
    });
}

newClassCtrl.findByID = async (req, res) => {
    await db.query("SELECT * FROM newclasses  WHERE _id = ?", [req.query._id], (error, data) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            return res.status(200).json(data[0]);
        }
    });
}

newClassCtrl.updateByID = async (req, res) => {
    await db.query("UPDATE newclasses SET address = ?, district = ?, sobuoi = ?, time = ?, salary = ?, require = ?, status = ?, contact = ? WHERE _id = ?",
        [req.body.address, req.body.district, req.body.sobuoi, req.body.time, req.body.salary, req.body.require, req.body.status, req.body.contact, req.query._id],
        (error, result) => {
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

module.exports = newClassCtrl;