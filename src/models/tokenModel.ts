import mongoose, {Types} from "mongoose";

interface  IToken extends mongoose.Document {
    user: Types.ObjectId;
    otp: string;
    type: string;
    expires: Date;
}

const tokenSchema = new mongoose.Schema<IToken>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["email", "password"],
        },
        expires: {
            type: Date,
            required: true,
            default: Date.now() + 10 * 60 * 1000, // 10mins validity
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IToken>("Token", tokenSchema);