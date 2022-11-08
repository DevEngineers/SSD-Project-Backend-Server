const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        user: {
            type: String,
            default: "",
            required: true,
        },
        date: {
            type: String,
            default: "",
            required: true,
        },
        message: {
            type: String,
            default: "",
            required: true,
        },
        fileLocation: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Message", Message);