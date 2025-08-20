import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            validate: {
                validator: async (userId) => {
                    const user = await mongoose.model('User').findById(userId);
                    return !!user;
                },
                message: 'Invalid user ID'
            }
        },
		room: { type: String, required: true },
	},
	{ timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export const saveMessage = async (data) => {
    try {
        const message = new Message(data);
        return await message.save();
    } catch (err) {
        throw new Error(`Failed to save message: ${err.message}`);
    }
}
export const updateMessage = async (messageId, userId, new_message) => {
    try {
        const result = await Message.findByIdAndUpdate(
            { _id: messageId, user: userId },
            { text: new_message },
            { new: true }
        );

        if (!result) throw new Error('Message not found or unauthorized');
        return result;
    } catch (err) {
        throw new Error(`Failed to save message: ${err.message}`);
    }
}

export const deleteMessage = async (messageId, userId) => {
    const result = await Message.findOneAndDelete({
        _id: messageId,
        user: userId,
    });
    if (!result) throw new Error('Failed to delete message');
    return result;
}

export const getMessagesByText = async (room, text) => {
    return await Message.find({ room: room, text: { $regex: text, $options: '1'} }); // Case-insensitive search
}

export const getMessagesByRoom = async (room, limit = 50, skip = 0) => {
    return await Message.find({ room: room })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(`user`, `username`);
}

export default Message;