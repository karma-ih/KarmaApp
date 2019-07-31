const MongoClient = require("mongodb").MongoClient;
const provendbUri = process.env.PROVENDB_URI;

// Connection checker for ProvenDb Database
// const main = () => {
//   MongoClient.connect(provendbUri, {
//     useNewUrlParser: true
//   }).then(mongoclient => {
//     const provendb = mongoclient.db();
//     provendb.command({ getVersion: 1 }).then(currentVersion => {
//       console.log(currentVersion);
//       process.exit(0);
//     });
//   });
// };
// main();

const performTransaction = (postingId, amount, type, userId) => {
  MongoClient.connect(provendbUri, {
    useNewUrlParser: true
  })
    .then(mongoclient => {
      console.log("Connected to ProvenDB!");
      const provendb = mongoclient.db();
      provendb.transactions
        .insert({
          posting: postingId,
          amount: amount,
          status: type,
          user: userId
        })
        .then(transaction => {
          console.log(transaction);
          console.log("Logging out of ProvenDB!");
          process.exit(0);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
// performTransaction();
module.exports = performTransaction;
