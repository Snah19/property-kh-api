import express from "express";
import { deleteMessageByMessageId, getMessagesByRecipientId, getTotalUnreadMessagesByRecipeintId, markMessageAsReadByMessageId, sendMessage } from "../controllers/message-controllers.js";

const router = express.Router();

router.post("/messages/", sendMessage);
router.get("/messages/:recipientId", getMessagesByRecipientId);
router.delete("/messages/:messageId", deleteMessageByMessageId);
router.patch("/messages/:messageId", markMessageAsReadByMessageId);
router.get("/messages/unread/:recipientId", getTotalUnreadMessagesByRecipeintId);

export default router;