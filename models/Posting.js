const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postingSchema = new Schema(
  {
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    applicant: [{ type: Schema.Types.ObjectId, ref: "User" }],
    otherParty: [{ type: Schema.Types.ObjectId, ref: "User" }],
    karma: Number,
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
    message: [
      {
        message: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
    isDone: {
      type: Boolean,
      default: false
    }
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
