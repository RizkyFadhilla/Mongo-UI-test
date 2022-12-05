const userDb = require("../models/data");
class userDataController {
  static async getAllData(req, res) {
    try {
      const response = await userDb.getData();
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json("internal service error");
    }
  }
}
module.exports = userDataController;
