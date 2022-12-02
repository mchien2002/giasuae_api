const db = require("../../cfg/db.config");
const tutorModel = require("../models/tutor_model");
const routinesCtr = require("./routines_controller");

const tutorCtr = {}
async function regression(index, res, result) {
    index >= 0 ? await db.query(
        routinesCtr.getClassByIdTutor(result[index]._id) +
        routinesCtr.getSubjectByIdTutor(result[index]._id),
        (error, resultArr) => {
            if (error) {
                console.log(error.message);
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong"
                });
            } else {
                result[index].classes = resultArr[0];
                result[index].subjects = resultArr[2];
                index--;
                regression(index, res, result);
            }
        }) : res.status(200).json(result);
}
tutorCtr.find = async (req, res) => {
    await db.query("SELECT * FROM tutors", async (error, result, fields) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            })
        } else {
            const index = result.length - 1;
            regression(index, res, result);
        }
    });
}
tutorCtr.filter = async (req, res) => {

}
tutorCtr.create = async (req, res) => {
    const item = new tutorModel(req.body);
    await db.query("INSERT INTO tutors SET ?", item, async (error, result) => {
        if (error) {
            throw error;
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong",
            })
        } else {
            try {
                req.body.classes ? await db.query("INSERT INTO classes_of_tutor(_id_tutor, _id_class) VALUES ?",
                    [req.body.classes.map((item) => [result.insertId, parseInt(item)])]) : null;
                req.body.subjects ? await db.query("INSERT INTO subjects_of_tutor(_id_tutor, _id_subject) VALUES ?",
                    [req.body.subjects.map((item) => [result.insertId, parseInt(item)])]) : null;
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
tutorCtr.updateByID = async (req, res) => {
    const item = new tutorModel(req.body);
    await db.query("UPDATE tutores SET ? WHERE _id = ?",
        [itemNC, req.query._id],
        async (error, result) => {
            if (error) {
                console.log(error.message);
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong"
                })
            } else {
                req.body.classes ? await db.query("DELETE FROM classes_of_tutor WHERE _id_tutor = ? ;INSERT INTO classes_of_tutor(_id_tutor, _id_class) VALUES ?",
                    [req.query._id, req.body.classes.map((item) => [req.query._id, parseInt(item)])]) : null;
                req.body.subjects ? await db.query("DELETE FROM subjects_of_tutor WHERE _id_tutor = ? ;INSERT INTO subjects_of_tutor(_id_tutor, _id_subject) VALUES ?",
                    [req.query._id, req.body.subjects.map((item) => [req.query._id, parseInt(item)])]) : null;
                return res.status(200).json("Successful");
            }
        }
    );
}
tutorCtr.deleteByID = async (req, res) => {
    trigBeforeDelTutor(req, res, async () => {
        await db.query("DELETE FROM tutors  WHERE _id = ?", [req.query._id], (error, data) => {
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

async function trigBeforeDelTutor(req, res, result) {
    await db.query("DELETE FROM classes_of_tutor WHERE _id_tutor = ?; DELETE FROM subjects_of_tutor WHERE _id_tutor = ?;",
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
module.exports = tutorCtr;