const date = require('date-and-time');

const tutorModel = function (body) {
    this.name = body.name;
    this.address = body.address;
    this.email = body.email;
    this.phone = body.phone;
    this.school = body.school;
    this.department = body.department;
    this.subjects = body.subjects;
    this.classes = body.classes;
    this.teachAreas = body.teachAreas;
    this.vehicle = body.vehicle;
    this.sobuoi = body.sobuoi;
    this.gender = body.gender;
    this.birthYear = body.birthYear;
    this.graduateYear = body.graduateYear;
    this.isNow = body.isNow;
    this.describe = body.describe;
    this.createdAt = date.format(new Date(),'YYYY/MM/DD HH:mm:ss'); 
}

module.exports = tutorModel;