const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get("/", postsController.lists);
router.get("/:id", postsController.list);
router.post("/", postsController.addPost);
router.delete("/:id", postsController.restricted);
router.put("/:id", postsController.restricted);
router.patch("/:id", postsController.restricted);
module.exports = router;
