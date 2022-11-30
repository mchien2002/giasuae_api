const date = require('date-and-time');
const transactionModel = function (body) {
    this.amount = body.amount;
    this.content = body.content;
    this.accountNumber = body.accountNumber;
    this.status = body.status;
    this.createdAt = date.format(new Date(),'YYYY/MM/DD HH:mm:ss'); 
}
module.exports = transactionModel;