const date = require('date-and-time');

const postModel = function (body) {
    this.style = body.style;
    this.title = body.title;
    this.body = body.body;
    this.img = body.img;
    this.createdAt = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
}
module.exports = postModel;