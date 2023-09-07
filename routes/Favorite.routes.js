const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");
const MountTracker = require("../models/MountTracker.model")

router.get("/new-favorite", isAuthenticated, async (req,res,next)=>{
    try {
        const creator = await User.findById(req.payload._id)
        res.json({
            user : creator
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

router.post("/mounts/mark-as-owned", isAuthenticated, async (req, res,next) => {
    try {
      const { mountId } = req.params;
  
      // Create or update the user's ownership record for the mount
      await MountTracker.findOneAndUpdate(
        { mount: mountId, user: req.user._id },
        { status: "owned" },
      
      );
  
      res.status(200).json({ message: "Marked as owned" });
  
    } catch (error) {
     next(error)
    }
  });

router.get("/:favoriteId", isAuthenticated, async(req,res,next)=>{
    const commentbox = req.body
    try {
        const favoriteId = req.params.favoriteId
        const mount = await MountTracker.findById(favoriteId).populate(
            "user"
        );
        res.json({
            mount : mount,
            commentbox : commentbox
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


router.delete("/:favoriteId/delete-fav", isAuthenticated, async (req, res, next) => {
    try {
        const favoriteId = req.params.favoriteId;
        
    
        const favoriteToDelete = await MountTracker.findById(favoriteId);

      
        if (!favoriteToDelete) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        if (favoriteToDelete.user.toString() !== req.payload._id) {
            return res.status(403).json({ message: "You are not authorized to delete this favorite" });
        }

   
        await favoriteToDelete.remove();

        res.json({ message: "Favorite deleted successfully" });
    } catch (error) {
        next(error);
    }
});



module.exports = router;