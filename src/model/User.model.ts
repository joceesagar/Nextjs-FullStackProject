//schemas written through mongoose are for mongodb for creating structures in database
//schemas inside schemas folder are only for validation of data not for creating any structure in database
import mongoose, { Schema, Document } from "mongoose";



export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [messageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)
//mongoose.models.User as mongoose.Model<User> -- returns model when it exists. mongoose.models.User returns schema and as mongoose.Model<User> indicates the model is of type mongoosemodels and more specific of type User

//mongoose.model<User>('User', UserSchema) -- creates a new model if it doesn't exists. || operator is used to return the existing model if it exists otherwise it will create one which is when the application is first time starting.

export default UserModel; //exporting the model so it can be used in other files