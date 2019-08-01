// ProvenDB
const MongoClient = require("mongodb").MongoClient;
const provendbUri = process.env.PROVENDB_URI;

// Mongoose
const mongoose = require("mongoose");
const Posting = require("../models/Posting");
const User = require("../models/User");

// Connection checker for ProvenDb Database
const main = () => {
  MongoClient.connect(provendbUri, {
    useNewUrlParser: true
  }).then(mongoclient => {
    const provendb = mongoclient.db();
    provendb.command({ getVersion: 1 }).then(currentVersion => {
      console.log(currentVersion);
      process.exit(0);
    });
  });
};
// main();

const performEscrow = (postingId, amount, type, userId, res) => {
  MongoClient.connect(provendbUri, {
    useNewUrlParser: true
  }).then(mongoclient => {
    console.log("Connected to ProvenDB!");
    const provendb = mongoclient.db();
    return provendb
      .collection("transactions")
      .insert({
        posting: postingId,
        amount: amount,
        status: type,
        user: userId
      })
      .then(transaction => {
        console.log(
          `Transaction completed with status: ${transaction.ops[0].status}`
        );
        const transactionId = transaction.ops[0]._id;
        return User.findByIdAndUpdate(
          userId,
          { $inc: { karma: amount }, $push: { transactions: transactionId } },
          { new: true }
        ).then(user => {
          res.json(user);
          console.log(
            `User ${user.username}, balance updated: ${amount} karma`
          );
          console.log(`User ${user.username} transactions updated.`);
          return Posting.findByIdAndUpdate(
            postingId,
            { $push: { transactions: transactionId } },
            { new: true }
          ).then(posting => {
            console.log(`Posting ${posting.title} transactions updated:`);
            mongoclient.close();
            console.log("Logged out of ProvenDB!");
          });
        });
      });
  });
};

const performPayout = (postingId, amount, type, userId, isDone, res) => {
  MongoClient.connect(provendbUri, {
    useNewUrlParser: true
  })
    .then(mongoclient => {
      console.log("Connected to ProvenDB!");
      const provendb = mongoclient.db();
      return provendb
        .collection("transactions")
        .insert({
          posting: postingId,
          amount: amount,
          status: type,
          user: userId
        })
        .then(transaction => {
          console.log(
            `Transaction completed with status: ${transaction.ops[0].status}`
          );
          const transactionId = transaction.ops[0]._id;
          return User.findByIdAndUpdate(
            userId,
            { $inc: { karma: amount }, $push: { transactions: transactionId } },
            { new: true }
          ).then(user => {
            console.log(
              `User ${user.username}, balance updated: ${amount} karma`
            );
            console.log(`User ${user.username} transactions updated.`);
            return Posting.findByIdAndUpdate(
              postingId,
              { $push: { transactions: transactionId }, isDone: isDone },
              { new: true }
            ).then(posting => {
              res.json(posting);
              console.log(`Posting ${posting.title} transactions updated:`);
              mongoclient.close();
              console.log("Logged out of ProvenDB!");
            });
          });
        });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = { performEscrow, performPayout };
