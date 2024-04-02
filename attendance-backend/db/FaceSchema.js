var mongoose = require('mongoose');

const faceSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: Object,
        required: true
    },
});

const Face = mongoose.model("Face", faceSchema)

module.exports = Face;