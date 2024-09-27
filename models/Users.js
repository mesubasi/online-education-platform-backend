const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password must be at least 6 characters long"],
      validate: {
        validator: function (value) {
          // Özel Doğrulama Mantığı
          return (
            /[A-Z]/.test(value) && // At least one uppercase letter
            /[a-z]/.test(value) && // At least one lowercase letter
            /[0-9]/.test(value) && // At least one digit
            /[!@#$%^&*]/.test(value) // At least one special character
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character from !@#$%^&*",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", usersSchema);
