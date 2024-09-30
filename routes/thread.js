const express = require("express");
const router = express.Router();

const threadController = require("../controllers/thread");

router.post("/all", threadController.getAll);
router.post("/posting", threadController.posting);
router.post("/detail", threadController.detail);
router.post("/closed", threadController.closed);

module.exports = router;