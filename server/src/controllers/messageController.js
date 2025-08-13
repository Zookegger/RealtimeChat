const { Message } = require('../models');

async function writeMessage({sender, message, session}) {
    const msg = new Message({sender, message, session});
    return await msg.save();
}

async function getMessages(sessionId) {
    if (sessionId) {
        return await Message.find({ session: sessionId }).sort({ timestamp: 1 });
    }
    return await Message.find().sort({ timestamp: 1 });
}

export default {
    writeMessage,
    getMessages
}