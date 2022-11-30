const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyTokenCtrl = {}
verifyTokenCtrl.verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.SECRET_KEY_JWT, (err, admin) => {
            if (err) return res.status(403).json("Token is not valid");
            else {
                console.log("asdasdwdasdafwa");
                next();
            }
        })
    } else {
        res.status(401).json("You are not authenticated");
    }

}
module.exports = verifyTokenCtrl;