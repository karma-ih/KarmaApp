const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String
      // required: true,
      // unique: true
    },
    password: {
      type: String
      // minlength: 8
    },
    facebookId: {
      type: String
      // required: true,
      // unique: true // Anih: Cannot be unique as multiple people need a user as null // Dominik: Is that so? I would assume facebook has unique ids in their database?
      // just for us (signup with facebook)
    },
    facebookName: {
      type: String
      // required: true
      // just for us (signup with facebook)
    },
    phoneNumber: {
      type: Number
      // required: true
    },
    karma: {
      type: Number,
      default: 100
      // required: true
      // Dominik: let's make it a number format of 6.2534 (maximum 4 comma places)?
    },
    email: {
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
      }
    },
    imageUrl: {
      type: String
    },
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
  },
  {
    timestamps: true
  }
);

// Ani: Where is the translation from User Facebook name to user String?

const User = mongoose.model("User", userSchema);
module.exports = User;
