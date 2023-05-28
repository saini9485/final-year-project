const express = require("express");
const adminUserRoutes = express.Router();
const auth = require("../middlewares/auth.middleware.js");
const UserModel = require("../models/user.model.js");
const superadminVerify = require("../middlewares/superadmin.action.middleware.js");
//get request user
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


adminUserRoutes.get("/users", auth, async (req, res) => {
  let page = req.query.page;
  let limit = page==0?0:5;
  let skip = (page - 1) * limit;
  try {
    let user = await UserModel.find({ role: "user" })
      .skip(skip)
      .limit(limit);
      let totalUser= await UserModel.find({ role: "user" });
    res.status(200).send({user,totalUser:totalUser.length});
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});

//get request admin
adminUserRoutes.get("/admin", auth, async (req, res) => {
  let page = req.query.page ;
  let limit =page==0?0: 5;
  let skip = (page - 1) * limit;
  try {
    let user = await UserModel.find({
      $or: [{ role: "admin" }, { role: "superadmin" }],
    })

      .skip(skip)
      .limit(limit);
      let TotalAdmin = await UserModel.find({
        $or: [{ role: "admin" }, { role: "superadmin" }],
      })

    res.status(200).send({user,TotalAdmin:TotalAdmin.length});
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});

//delete request user
adminUserRoutes.delete("/user/:id", auth, async (req, res) => {
  let id = req.params.id;
  try {
    await UserModel.findByIdAndDelete(id);
    res.status(200).send("user deleted");
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});

//add admin by super admin
adminUserRoutes.post("/add/admin", auth, superadminVerify, async (req, res) => {
  let {firstname,lastname,email,hashedPassword,role}=req.body;
  try {
 const hashedPass=await bcrypt.hash(hashedPassword,12)
//     bcrypt.hash(hashedPassword, 12, (err, hash) => {
       const user = new UserModel({
         firstname,lastname,email,hashedPassword:hashedPass,role
      });

     user.save().then((ress) => {
         res.status(200).send({ message: "registartion completed" });
      });
    }
//console.log(hashedPass)
    //  let admin = new UserModel(req.body);
    //  await admin.save();
   
    //res.status(200).send("admin added");
   catch (er) {
    res.status(400).send({ error: er.message });
  }
});


//delete admin by super admin
adminUserRoutes.delete(
  "/delete/admin/:id",
  auth,
  superadminVerify,
  async (req, res) => {
    let id = req.params.id;
    try {
      await UserModel.findByIdAndDelete(id);

      res.status(200).send("admin deleted");
    } catch (er) {
      res.status(400).send({ error: er.message });
    }
  }
);



adminUserRoutes.patch(
  "/update/admin/:id",
  auth,
  superadminVerify,
  async (req, res) => {
    let id = req.params.id;
    try {
      await UserModel.findByIdAndUpdate(id,req.body);

      res.status(200).send("admin updated");
    } catch (er) {
      res.status(400).send({ error: er.message });
    }
  }
);








module.exports = adminUserRoutes;
