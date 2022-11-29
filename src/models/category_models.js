const date = require('date-and-time')

var categoryModel = function (body) {
    this.name = body.name;
    this.style = body.style;
    this.createdAt = date.format(new Date(),'YYYY/MM/DD HH:mm:ss');
};
module.exports = categoryModel;