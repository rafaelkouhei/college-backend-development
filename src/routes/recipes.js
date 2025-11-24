const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipes");

const { verifyToken } = require("../middlewares/auth");
const { canModify } = require("../middlewares/modify");

// public routes
router.get("/", recipeController.listAll);
router.get("/:id", recipeController.searchById);

// protected routes
router.post("/", verifyToken, recipeController.add);
router.put("/:id", verifyToken, canModify, recipeController.update);
router.delete("/:id", verifyToken, canModify, recipeController.delete);

module.exports = router;