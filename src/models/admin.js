import {Schema, model, models}  from "mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    }
})

const AdminUser = models.AdminUser || model("AdminUser", adminSchema);

export default AdminUser;