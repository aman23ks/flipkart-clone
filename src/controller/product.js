const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { name, price, quantity, description, category, createdBy } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      //the map function will find all the files and store them in a array productPictures
      return { img: file.filename }; //We return a object because in our product model we have created productPictures as a model.
    });
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(201).json({ product });
  });
  //for testing: // res.status(200).json({ file: req.files, body: req.body }); //for a single picture we do req.file , for multiple files we do req.files
};
