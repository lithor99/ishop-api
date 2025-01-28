const Products = require("../models/product.model");

exports.create = async (req, res) => {
  try {
    Products.create({ ...req.body }).then((product) => {
      res.status(200).send(product);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;

    Products.findAndCountAll({
      offset: limit * (page - 1),
      limit: parseInt(limit),
    }).then((products) => {
      res.status(200).send(products);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    Products.findOne({ where: { id: req.params.id } }).then(async (product) => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send({ message: "Data not found" });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    Products.update({ ...req.body }, { where: { id: req.params.id } }).then(
      (_) => {
        Products.findOne({ where: { id: req.params.id } }).then((product) => {
          res.status(200).send(product);
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    Products.destroy({ where: { id: req.params.id } }).then((_) => {
      res.status(200).send({ message: "Data has been deleted" });
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
