const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postingSchema = new Schema(
  {
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    otherParty: { type: Schema.Types.ObjectId, ref: "User" },
    price: Number,
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
    },
    chat: [
      {
        message: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    transcation: { type: Schema.Types.ObjectId, ref: "Transaction" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Posting = mongoose.model("Posting", postingSchema);

module.exports = Posting;
