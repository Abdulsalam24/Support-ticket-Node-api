const express = require("express");
const { getNotes, createNote,updateNote } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router({mergeParams : true})

router.route("/").get(protect,getNotes).post(protect,createNote)

// router.route("/:id").put(protect , updateNote)

module.exports = router