const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");

/// Admin routes all Ads
router.get("/getAll/users", (req, res) => {
  User.find().exec((err, user) => {
    if (err) return req.status(400).send(err);
    return res.status(200).send(user);
  });
});

/// Admin routes all Ads
router.get("/getAll/posts", (req, res) => {
  let order = req.body.order ? req.body.order : "1";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  Product.find()
    .sort([[sortBy, order]])
    .exec((err, product) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(product);
    });
});

/// Admin routes all Pending Ads
router.get("/getAll/posts/pendingAds", (req, res) => {
  Product.find({ isApproved: false }).exec((err, product) => {
    if (err) return req.status(400).send(err);
    return res.status(200).send(product);
  });
});

//// Delete post

router.delete("/delete/:id", (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id })
    .then((user) => res.json("Deleted"))
    .catch((err) => res.status(400).res.json("Error" + err));
});

//// Update Post to Active

router.put("/update/", (req, res) => {
  let ads = {
    isApproved: req.body.isApproved,
  };
  if (ads.isApproved == true) {
    ads.isApproved = false;
  } else if (ads.isApproved == false) {
    ads.isApproved = true;
  }

  Product.findByIdAndUpdate({ _id: req.body._id }, ads)
    .then((ads) => {
      console.log(ads);
      res.json("Updated Succesfully" + ads);
    })
    .catch((err) => res.status(400).res.json("Error" + err));
});

/////////// Delete User /////////////////////

router.delete("/users/delete/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((user) => res.json("Deleted"))
    .catch((err) => res.status(400).res.json("Error" + err));
});
//////////////////////////////////////////////

router.delete("/posts/:id", function (req, res, next) {
  Post.remove({ _id: req.params.id }, function (err, post) {
    if (err) {
      res.send(err);
    }

    Comment.remove({ post: req.params.id }, function (err, post) {
      if (err) {
        res.send(err);
      }
    });

    res.json({ message: "Successfully deleted" });
  });
});

module.exports = router;
