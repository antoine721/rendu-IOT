const express = require("express");
const UsersController = require("../controllers/usersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");

const router = express.Router();

router.get("/users", UsersController.index); // GET /users
router.get("/users/:id", UsersController.show); // GET /users/:id
router.post("/users", UsersController.store); // POST /users
router.post("/login", AuthentificationController.login);
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);

module.exports = router;