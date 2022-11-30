const date = require('date-and-time')

var subjectModel = function (body) {
    this.name = body.name;
    this.createdAt = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
};
module.exports = subjectModel;