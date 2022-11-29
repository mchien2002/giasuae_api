const db = require('../../cfg/db.config');
const date = require('date-and-time');
const newClassModel = function (body) {
    this.address = body.address;
    this.district = body.district;
    this.sobuoi = body.sobuoi;
    this.time = body.time;
    this.salary = body.salary;
    this.require = body.require;
    this.status = body.status;
    this.contact = body.contact;
    this.createdAt = date.format(new Date(),'YYYY/MM/DD HH:mm:ss'); 
}

module.exports = newClassModel;