import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
    try {
        await Message.create(req.body);
        res.status(200).json({ isSent: true });
    }
    catch (error) {
        console.log("Error sending a message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessagesByRecipientId = async (req, res) => {
    try {
        const messages = await Message.find({ recipient_id: req.params.recipientId }).sort({ updatedAt: -1 }).populate("sender_id", "username").populate("property_id", "title");
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteMessageByMessageId = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.messageId);
        res.status(200).json({ isDeleted: true });
    }
    catch (error) {
        console.log("Error deleting message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const markMessageAsReadByMessageId = async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.messageId, { is_read: true }, { new: true });
        res.status(200).json({ isMarked: true });
    }
    catch (error) {
        console.log("Error marking message as read:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTotalUnreadMessagesByRecipeintId = async (req, res) => {
    try {
        const count = await Message.countDocuments({ recipient_id: req.params.recipientId, is_read: false });
        res.status(200).json({ count });
    }
    catch (error) {
        console.log("Error fetching unread messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};