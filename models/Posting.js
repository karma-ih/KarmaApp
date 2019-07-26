const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postingSchema = new Schema(
  {
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    price: Number,
    otherParty: { type: Schema.Types.ObjectId, ref: "User" },
    transcation: { type: Schema.Types.ObjectId, ref: "Transaction" },
    chat: [
      {
        message: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Posting = mongoose.model("Task", postingSchema);

module.exports = Posting;
