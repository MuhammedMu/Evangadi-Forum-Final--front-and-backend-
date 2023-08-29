const router = require("express").Router();
const auth = require("../../middleware/auth");
const { createUser, getUsers, getUserById, login } = require("./user.controller");

// Route for creating user 
router.post("/", createUser);
// Route for fetching all user data
router.get("/all", getUsers);
// Route for fetching single user data by id
router.get("/", auth, getUserById);
// Route for login
router.post("/login", login);

module.exports = router;
