const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String
      // required: true,
      // unique: true
    },
    imageUrl: {
      type: String
    },
    password: {
      type: String
      // minlength: 8
    },
    facebookId: {
      type: String,
      // required: true,
      unique: true
    },
    facebookName: {
      type: String
      // required: true
    },
    address: {
      type: Object,
      street: {
        type: String
        // required: true
      },
      postalCode: {
        type: String
        // required: true
      },
      city: {
        type: String
        // required: true
      },
      country: {
        type: String
        // required: true
      }
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number]
        // required: true
      }
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
