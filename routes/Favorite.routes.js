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

router.patch("/:favoriteId", isAuthenticated,async(req,res,next)=>{
    const {_id} = req.payload;
    const {favoriteId} = req.params
    try {
        await User.findByIdAndUpdate(_id,{
            $addToSet: {favorites : favoriteId},
        })
        res.status(200).json("todo gucci")
    } catch (error) {
        next(error)
    }
})


router.get("/:favoriteId", isAuthenticated, async(req,res,next)=>{
    
    try {
       
        const { favoriteId} = req.params
         const  {commentbox} = req.body
        const mount = await MountTracker.findById(favoriteId).populate(
            "user"
        );
        console.log("sale unde",mount);
        res.json({
            mount : mount,
            comment :  commentbox
        })
    } catch (error) {
        next(error)
    }
})
router.put("/:favoriteId/update", isAuthenticated, async (req, res, next) => {
    try {
      const { favoriteId } = req.params;
      const updateData = req.body; 
  
      // Use findByIdAndUpdate to find and update the mount
      const updatedMount = await MountTracker.findByIdAndUpdate(
        favoriteId,
        { $set: updateData }, // Update only the specified fields
        { new: true } // return the updated mount after the update
      ).populate("user");
  
      if (!updatedMount) {
        // If the mount with the given favoriteId is not found
        return res.status(404).json({ error: "Mount not found" });
      }
  
      res.json({ updatedMount });
    } catch (error) {
      next(error);
    }
  });
  


router.delete("/:favoriteId/delete-fav", isAuthenticated, async (req, res, next) => {
    try {
        const {favoriteId} = req.params;
        console.log("Deleting favorite with ID:", favoriteId);
        
    
        const favoriteToDelete = await MountTracker.findById(favoriteId);

      
        if (!favoriteToDelete) {
            return res.status(404).json({ message: "Favorite not found" });
        }

        if (favoriteToDelete.user.toString() !== req.payload._id) {
            return res.status(403).json({ message: "You are not authorized to delete this favorite" });
        }

   
        await MountTracker.findByIdAndDelete(favoriteId);

        res.json({ message: "Favorite deleted successfully" });
    } catch (error) {
        next(error);
    }
});



module.exports = router;