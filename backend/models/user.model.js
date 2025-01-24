import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please tell us your name!"],
        minlength: [3, "A username must have more or equal than 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "A password must have more or equal than 6 characters"],
    },
    role: {
        type: String,
        enum: ["candidate", "recruiter"],
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeName: { type: String },
        appliedCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilePicture: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;