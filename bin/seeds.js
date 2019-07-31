const MongoClient = require("mongodb").MongoClient;
// const provendbUri = process.env.PROVENDB_URI;
const provendbUri =
  "mongodb://karmahacker:keyboardkarma@karma-app.provendb.io/karma-app?ssl=true";

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
main();

const createTransactionCollection = () => {
  MongoClient.connect(provendbUri, {
    useNewUrlParser: true
  })
    .then(mongoclient => {
      const provendb = mongoclient.db();
      return provendb.createCollection("transactions", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["posting", "amount", "status", "user"],
            properties: {
              posting: {
                bsonType: "objectId",
                description: "Posting reference required."
              },
              amount: {
                bsonType: "double",
                description: "Transaction amount required."
              },
              user: {
                bsonType: "objectId",
                description: "User reference required."
              },
              status: {
                enum: ["escrow", "completed", "refund"],
                description: "Status of transaction needs to be defined."
              }
            }
          }
        }
      });
    })
    .then(response => {
      console.log(response);
      console.log("Transaction collection + validation created on ProvenDB.");
      process.exit(0);
    })
    .catch(err => {
      console.log(err);
    });
};

createTransactionCollection();
