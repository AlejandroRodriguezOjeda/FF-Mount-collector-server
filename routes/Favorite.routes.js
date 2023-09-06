const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");
const MountTracker = require("../models/MountTracker.model")

router.get("/new-favorite", isAuthenticated, async (req,res,next)=>{
    try {
        const creator = await User.findById(req.payload._id)
        res.json({
            user : user 
        })
    } catch (error) {
        next(error)
    }
})

router.post("/new-favorite", isAuthenticated, async (req,res,next)=>{
    try {
        await MountTracker.create({
            user : req.payload._id,
            mount : req.body.mount,
            commentbox : req.body.commentbox

        })

        res.json("montura creada y añadidas a favs")
    } catch (error) {
        next(error)
    }
})

router.get("/:favoriteId", isAuthenticated, async(req,res,next)=>{
    try {
        const favoriteId = req.params.favoriteId
        const oneFavorite = await MountTracker.findById(favoriteId).populate(
            "user"
        );
        res.json({
            oneFavorite : oneFavorite
        })
    } catch (error) {
        next(error)
    }
})

router.put("/:favoriteId/update", isAuthenticated, async(req,res,next)=>{
    try {
        const {favoriteId} = req.params;
        const oneMount = await MountTracker.findByIdAndUpdate(favoriteId).populate(
            "user"
        );
        res.json({
            oneMount : oneMount
        })
    } catch (error) {
        next(error)
    }
})


// router.patch("/:favoriteId/delete-fav", isAuthenticated,async (req,res,next))





module.exports = router;