var mongoose = require('mongoose');

const faceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: Object,
        required: true
    },
});

const Face = mongoose.model("Face", faceSchema)

module.exports = Face;