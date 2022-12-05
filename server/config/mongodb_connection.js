const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

//database name
const dbName = "Mongo_and_UI_Test";
let db;

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}
function getDB() {
  return db;
}

module.exports = {
  getDB,
  main,
};
