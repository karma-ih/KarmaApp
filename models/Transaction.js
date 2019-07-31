// ProvenDB Schema
const provenMongoClient = require("mongoose");
const Schema = provenMongoClient.Schema;

const transactionSchema = new Schema(
  {
    posting: { type: Schema.Types.ObjectId, ref: "Posting" },
    amount: Number,
    status: {
      type: String,
      enum: ["escrow", "completed", "refund"]
    },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Transaction = provenMongoClient.model("Transaction", transactionSchema);

module.exports = Transaction;
