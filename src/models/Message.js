import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const MessageSchema = new Schema(
    {
        sender_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipient_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        property_id: {
            type: Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone_number: String,
        body: String,
        is_read: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;