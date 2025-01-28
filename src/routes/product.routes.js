const productController = require("../controllers/product.controller");
const { verifyToken } = require("../middleware");

module.exports = (app) => {
  app.post("/products", verifyToken, productController.create);
  app.get("/products", verifyToken, productController.getAll);
  app.get("/products/:id", verifyToken, productController.getOne);
  app.put("/products/:id", verifyToken, productController.update);
  app.delete("/products/:id", verifyToken, productController.delete);
};
