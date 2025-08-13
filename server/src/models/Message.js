const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;