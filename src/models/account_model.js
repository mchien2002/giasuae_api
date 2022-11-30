var accountModel = function (body) {
    this.name = body.name;
    this.userName = body.userName;
    this.passWord = body.passWord;
    this.accessToken = body.accessToken;
    this.refreshToken = body.refreshToken;
};
module.exports = accountModel;