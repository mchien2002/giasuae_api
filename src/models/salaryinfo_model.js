const date = require('date-and-time');

const salaryinfoModel = function (body) {
    this.styleTeacher = body.styleTeacher;
    this.twoSessions = body.twoSessions;
    this.threeSessions = body.threeSessions;
    this.fourSessions = body.fourSessions;
    this.fiveSessions = body.fiveSessions;
    this.createdAt = date.format(new Date(),'YYYY/MM/DD HH:mm:ss'); 
}

module.exports = salaryinfoModel;