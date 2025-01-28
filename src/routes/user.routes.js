const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware");

module.exports = (app) => {
  app.post("/users", userController.create);
  app.post("/users/login", userController.login);
  app.get("/users", verifyToken, userController.getAll);
  app.get("/users/:id", verifyToken, userController.getOne);
  app.put("/users/:id", verifyToken, userController.update);
  app.delete("/users/:id", verifyToken, userController.delete);
};
