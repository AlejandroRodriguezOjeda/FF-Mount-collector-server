const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./profile.routes")
router.use("/user", userRouter)

const mountRouter = require("./Favorite.routes")
router.use("/mounts", mountRouter)

const commentsRouter = require("./comment.routes");
router.use("/comment", commentsRouter)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router;
