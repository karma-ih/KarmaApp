const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    title: String,
    description: String,
    amount: Number,
    status: {
      type: String,
      enum: ["escrow", "completed"]
    },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Posting = mongoose.model("Task", transactionSchema);

module.exports = Posting;
