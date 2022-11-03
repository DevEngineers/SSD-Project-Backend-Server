const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
    {
        sender: {
            type: String,
            default: "",
            required: true,
        },
        receiver: {
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
            required: true,
        },
    },
    {
        timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Message", Message);