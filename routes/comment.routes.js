const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");
const Comments = require("../models/Comments.model")


router.post("/:mountId/createComment", isAuthenticated, async(req,res,next)=>{
    const {_id} = req.payload;
    const { mountId }= req.params;
    const { comment} = req.body;
    console.log("body", req.body);



    const newComment = {
        username: _id,
        mount: mountId,
        comment: comment 
    }

    try {
        await Comments.create(newComment);
        res.status(201).json("Added Comment")
    } catch (error) {
        next(error)
    }
});

router.get("/:mountId/comments", isAuthenticated, async(req,res,next)=>{
    const {mountId} = req.params;
    try {
        const response = await Comments.find({ mount: `${mountId}`}).populate(
            "username"
        );
        console.log("response",mountId);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

router.delete("/:commentId/delete", isAuthenticated, async (req, res, next) => {
    const { commentId } = req.params;
    const { _id, role } = req.payload;
  
    try {
      const commentDetails = await Comments.findById(commentId);
      if (commentDetails.username._id == _id || role === "admin") {
        await Comments.findByIdAndDelete(commentId);
        res.status(200).json("Comment deleted");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router