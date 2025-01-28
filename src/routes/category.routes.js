const categoryController = require("../controllers/category.controller");
const { verifyToken } = require("../middleware");

module.exports = (app) => {
  app.post("/categories", verifyToken, categoryController.create);
  app.get("/categories", verifyToken, categoryController.getAll);
  app.get("/categories/:id", verifyToken, categoryController.getOne);
  app.put("/categories/:id", verifyToken, categoryController.update);
  app.delete("/categories/:id", verifyToken, categoryController.delete);
};
