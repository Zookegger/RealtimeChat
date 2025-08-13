const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;