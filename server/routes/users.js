const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");
//const { Payment } = require("../models/Payment");

const async = require("async");

const sendMail = require("../config/mail");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    favorite: req.user.favorite,
    history: req.user.history,
  });
});

///////////////Update User //////////////////////////

router.put("/UserUpdate/", (req, res) => {
  let user = {
    name: req.body.name,
  };
  User.updateOne({ _id: req.body._id }, user)
    .then((user) => {
      console.log(user);
      res.json("Updated Succesfully" + user);
    })
    .catch((err) => res.status(400).res.json("Error" + err));
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.get("/addTofavorite", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;

    console.log(userInfo);

    userInfo.favorite.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "favorite.id": req.query.productId },
        { $inc: { "favorite.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.favorite);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            favorite: {
              id: req.query.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.favorite);
        }
      );
    }
  });
});

router.get("/removeFromfavorite", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { favorite: { id: req.query._id } },
    },
    { new: true },
    (err, userInfo) => {
      let favorite = userInfo.favorite;
      let array = favorite.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, favoriteDetail) => {
          return res.status(200).json({
            favoriteDetail,
            favorite,
          });
        });
    }
  );
});

router.get("/userfavoriteInfo", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let favorite = userInfo.favorite;
    let array = favorite.map((item) => {
      return item.id;
    });

    Product.find({ _id: { $in: array } })
      .populate("writer")
      .exec((err, favoriteDetail) => {
        if (err) return res.status(400).send(err);
        return res
          .status(200)
          .json({ success: true, favoriteDetail, favorite });
      });
  });
});
/////////////////////////////

/////////////// Add to Favorite Mobile /////////////////////
router.post("/addTofavoriteMobile/:id/:id2", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, userInfo) => {
    let duplicate = false;
    userInfo.favorite.forEach((item) => {
      if (item.id == req.params.id2) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.params.id, "favorite.id": req.params.id2 },
        { $inc: { "favorite.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.favorite);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            favorite: {
              id: req.params.id2,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.favorite);
        }
      );
    }
  });
});

/////////////// User Favorite Mobile ///////////////////////

router.get("/userfavoriteInfoMobile/:id", (req, res) => {
  User.findOne({ _id: req.params.id }, (err, userInfo) => {
    let favorite = userInfo.favorite;
    let array = favorite.map((item) => {
      return item.id;
    });

    Product.find({ _id: { $in: array } })
      .populate("writer")
      .exec((err, favoriteDetail) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ favoriteDetail });
      });
  });
});

/////////////////////////////////////////////////////////////

router.get("/removeFromfavoriteMobile/:id/:id2", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { favorite: { id: req.params.id2 } },
    },
    { new: true },
    (err, userInfo) => {
      let favorite = userInfo.favorite;
      let array = favorite.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, favoriteDetail) => {
          return res.status(200).json({
            favoriteDetail,
            favorite,
          });
        });
    }
  );
});

/////////////////////////////////////////////////////////////

router.get("/Dashboard", auth, (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).res.json("Error " + err));
});

router.get("/posts", auth, (req, res) => {
  Product.find({ writer: req.user._id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).res.json("Error" + err));
});

///// Mobile My Ads posts ///////////
router.get("/posts/:id", (req, res) => {
  Product.find({ writer: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).res.json("Error" + err));
});

//////////// Public Ads Detail   /////////////
router.get("/postsDetails/:id", (req, res) => {
  Product.find({ _id: req.params.id })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).res.json("Error" + err));
});

//////////////////////////////////////

router.delete("/delete/:id", (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id })
    .then((user) => res.json("Deleted"))
    .catch((err) => res.status(400).res.json("Error" + err));
});

/////////Update///////////////

router.put("/update/", (req, res) => {
  let ads = {
    title: req.body.title,
    phone: req.body.phone,
    price: req.body.price,
    description: req.body.description,
  };

  ads.isApproved = false;

  Product.updateOne({ _id: req.body._id }, ads)
    .then((ads) => {
      console.log(ads);
      res.json("Updated Succesfully" + ads);
    })
    .catch((err) => res.status(400).res.json("Error" + err));
});

//////////////// Nodemailer Feedback /////////////////////////

router.post("/email", (req, res) => {
  console.log(req.body);
  const { name, email, comment } = req.body;

  sendMail(email, comment, name, function (err, data) {
    if (err) {
      res.status(500).json({ message: "Internet Error!" });
    } else {
      res.json({ message: "Email Sent..." });
    }
  });

  res.json({ message: "Feedback received!" });
});

module.exports = router;
