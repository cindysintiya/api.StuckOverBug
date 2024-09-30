const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");

router.post("/byId", commentController.getById);
router.post("/posting", commentController.posting);

module.exports = router;