import mongoose, { Schema, Document } from "mongoose";

export interface ILink {
    id: string;
    url: string;
    title: string;
    clicks: number;
}

export interface IUser extends Document {
    username: string;
    links: ILink[];
}

const linkSchema =  new Schema<ILink>({
    id: { type: String, unique: true, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    clicks: { type: Number, default: 0 },
})

const userSchema =  new Schema<IUser>({
    username: { type: String, required: true, unique: true, trim: true },
    links: { type: [linkSchema], default: [] },
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);
