const { getDB } = require("../config/mongodb_connection");
class userDb {
  static invokeDB() {
    let db = getDB();
    return db.collection("User");
  }
  static getData() {
    return this.invokeDB().find().toArray();
  }
}
module.exports = userDb;
