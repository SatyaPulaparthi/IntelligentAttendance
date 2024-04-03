var mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    attended: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: String,
        required: true
    },
});

const Attendance = mongoose.model("Attendance", attendanceSchema)

module.exports = Attendance;