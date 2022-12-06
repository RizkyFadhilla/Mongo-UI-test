const userDb = require("../models/data");
const validator = require("validator");

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
  static async insertData(req, res) {
    try {
      let { firstName, lastName, email, gender, addr } = req.body;
      if (!email) {
        res.status(400).json("Please Fill the email");
        return;
      } else if (!firstName) {
        res.status(400).json("Please Fill the First Name");
        return;
      } else if (!lastName) {
        res.status(400).json("Please Fill the LastName");
        return;
      } else if (!gender) {
        res.status(400).json("Please Fill the Gender");
        return;
      }
      if (!validator.email) {
        res.status(400).json("email must email format");
        return;
      }
      await userDb.insertData(req.body);
      res.status(201).json("user have been register");
    } catch (error) {
      res.status(500).json("internal service error");
    }
  }
  static async getOneUser(req, res) {
    try {
      let id = req.params.id;
      let findUser = await userDb.getOneData(id);
      if (!findUser) {
        res.status(404).json("User Not Found");
        return;
      }
      res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      res.status(500).json("internal service error");
    }
  }

  static async updateDataUser(req, res) {
    try {
      let id = req.params.id;
      let findUser = await userDb.getOneData(id);
      if (!findUser) {
        res.status(404).json("User Not Found");
        return;
      }
      let { firstName, lastName, email, gender, addr } = req.body;
      if (!email) {
        res.status(400).json("Please Fill the email");
        return;
      } else if (!firstName) {
        res.status(400).json("Please Fill the First Name");
        return;
      } else if (!lastName) {
        res.status(400).json("Please Fill the LastName");
        return;
      } else if (!gender) {
        res.status(400).json("Please Fill the Gender");
        return;
      }
      if (!validator.email) {
        res.status(400).json("email must email format");
        return;
      }
      const updateDoc = {
        $set: {
          firstName,
          lastName,
          email,
          gender,
          addr,
        },
      };
      await userDb.updateData(id, updateDoc);
      res.status(200).json("update user success");
    } catch (error) {
      res.status(500).json("internal service error");
    }
  }
}
module.exports = userDataController;
