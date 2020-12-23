const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

const { auth } = require("../middleware/auth");

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

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png" || ext !== ".jpeg") {
      return cb(
        res.status(400).end("only jpg, png and jpeg are allowed"),
        false
      );
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  //save all the data we got from the client into the DB
  const product = new Product(req.body);

  product.save((err) => {
    if (err) returnres.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

/////////////////////////////////////////

router.post("/uploadProductMobile", (req, res) => {
  //save all the data we got from the client into the DB
  const product = new Product(req.body);

  product.save((err) => {
    if (err) returnres.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

/////////////////////////////////////////

router.post("/getProducts", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log(findArgs);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term }, isApproved: true })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .find({ isApproved: true })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });
        res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

//?id=${productId}&type=single
//id=12121212,121212,1212121   type=array
router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = [];
    productIds = ids.map((item) => {
      return item;
    });
  }

  //we need to find the product information that belong to product Id
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return req.status(400).send(err);
      return res.status(200).send(product);
    });
});

//router.post("/category/:any", (req, res) => {
// Product.find({ Category: req.params.any })
//.exec()
//.then((category) => res.json(category))
//  .catch((err) => res.status(400).res.json("Error" + err));
//});

router.post("/category/:any", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  Product.find({ Category: req.params.any })
    .find({ isApproved: true })
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, products, postSize: products.length });
    });
});
///////////////// Multi Cards Slider /////////////////////////////////

router.post("/MultiCards/:any", async (req, res) => {
  const order = req.body.order ? req.body.order : "desc";
  const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  try {
    const product = await Product.findById(req.params.any)
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    const products = await Product.find({ Category: product.Category }).find({
      isApproved: true,
    });
    res
      .status(200)
      .json({ success: true, products, postSize: products.length });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

/////////////////////////// Report Ad //////////////////////////////

router.put("/Report/", (req, res) => {
  let ads = {
    report: req.body.report,
  };

  Product.updateOne({ _id: req.body.id }, ads)
    .then((ads) => {
      console.log(ads);
      res.json("Updated Succesfully" + ads);
    })
    .catch((err) => res.status(400).res.json("Error" + err));
});

////////////// Cities for Mobile APP /////////////////////////

router.post("/cities", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  Product.find({ cities: req.body.city })
    .find({ isApproved: true })
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, products, postSize: products.length });
    });
});
////////////////////////////////////////////////////////////////

module.exports = router;
