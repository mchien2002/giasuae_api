const db = require("../../cfg/db.config")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const accountModel = require('../models/account_model')
const accCtr = {}

accCtr.verifyLogin = async (req, res) => {
    await db.query("SELECT * FROM accounts WHERE _id = 1", (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).json({
                status: 500,
                message: "Some thing went wrong"
            });
        } else {
            try {
                if (req.query.userName != result[0].userName) res.status(200).json("Username was wrong!")
                else if (!bcrypt.compare(req.query.passWord, result[0].passWord)) res.status(200).json("Password was wrong!")
                else {
                    generAccToken(result[0]);
                    generRefreshToken(result[0]);
                    res.cookie("refreshToken", result[0].refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                    });
                    delete result[0]._id;
                    delete result[0].passWord;
                    delete result[0].refreshToken;
                    return res.status(200).json(result[0]);
                }
            } catch (err) {
                console.log(err.message);
                return res.status(500).json({
                    status: 500,
                    message: "Some thing went wrong"
                });
            }
        }
    })
}
function generAccToken(result) {
    result.accessToken = jwt.sign(
        { id: result._id },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "1d" }
    )
}
function generRefreshToken(result) {
    result.refreshToken = jwt.sign(
        { id: result._id },
        process.env.SECRET_REFRESH_KEY_JWT,
        { expiresIn: "365d" }
    )
}

module.exports = accCtr;