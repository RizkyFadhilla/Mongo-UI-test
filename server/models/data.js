const { getDB } = require("../config/mongodb_connection");
const { ObjectId } = require("mongodb");
class userDb {
  static invokeDB() {
    let db = getDB();
    return db.collection("User");
  }
  static getData() {
    return this.invokeDB().find().toArray();
  }
  static insertData(data){
    return this.invokeDB().insertOne(data)
  }
  static updateData(id, updateData){
    return this.invokeDB().updateOne({_id:ObjectId(id)}, updateData)
  }
}
module.exports = userDb;
