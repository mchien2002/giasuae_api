const db = require('../../cfg/db.config');
const newClassModel = require('../models/newclass_model');
const routinesCtr = require('./routines_controller');
const newClassCtr = {};

async function getArray(index, res, data) {
    index >= 0 ? await db.query(
        routinesCtr.getClassByIdNewClass(data[index]._id) +
        routinesCtr.getSubjectByIdNewClass(data[index]._id) +
        routinesCtr.getCategoriesByIdNewClass(data[index]._id),
        [data[index]._id, data[index]._id, data[index]._id],
        (error, result) => {
            if (error) {
                console.log(error.message);
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong"
                });
            } else {
                console.log(result);
                data[index].classes = result[0];
                data[index].subjects = result[1];
                data[index].categories = result[2];
                index--;
                getArray(index, res, data);
            }
        }) : res.status(200).json(data);
}

newClassCtr.find = async (req, res) => {
    await db.query("SELECT * FROM newclasses; ", async (error, data, fields) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            const index = data.length - 1;
            getArray(index, res, data);
        }
    });
}

newClassCtr.create = async (req, res) => {
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

newClassCtr.deleteByID = async (req, res) => {
    trigBeforeDelSubject(req, res, async () => {
        await db.query("DELETE FROM newclasses WHERE _id = ?", [req.query._id], (error, data) => {
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
    })
}

newClassCtr.filter = async (req, res) => {
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

newClassCtr.updateByID = async (req, res) => {
    const itemNC = new newClassModel(req.body);
    await db.query("UPDATE newclasses SET ? WHERE _id = ?",
        [itemNC, req.query._id],
        async (error, result) => {
            if (error) {
                console.log(error.message);
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong"
                })
            } else {
                req.body.classes ? await db.query("DELETE FROM classes_of_newclass WHERE _id_newclass = ? ;INSERT INTO classes_of_newclass(_id_newclass, _id_class) VALUES ?",
                    [req.query._id, req.body.classes.map((item) => [req.query._id, parseInt(item)])]) : null;
                req.body.subjects ? await db.query("DELETE FROM subjects_of_newclass WHERE _id_newclass = ? ;INSERT INTO subjects_of_newclass(_id_newclass, _id_subject) VALUES ?",
                    [req.query._id, req.body.subjects.map((item) => [req.query._id, parseInt(item)])]) : null;
                req.body.categories ? await db.query("DELETE FROM categories_of_newclass WHERE _id_newclass = ? ;INSERT INTO categories_of_newclass(_id_newclass, _id_category) VALUES ?",
                    [req.query._id, req.body.categories.map((item) => [req.query._id, parseInt(item)])]) : null;
                return res.status(200).json("Successful");
            }
        }
    )
}

async function trigBeforeDelSubject(req, res, result) {
    await db.query("DELETE FROM subjects_of_newclass WHERE _id_subject = ?; DELETE FROM subjects_of_tutor WHERE _id_subject = ?;",
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

module.exports = newClassCtr;