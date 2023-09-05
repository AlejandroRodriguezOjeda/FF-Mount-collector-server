const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");
const Comments = require("../models/Comments.model")


router.post("/:mountId/createComment", isAuthenticated, async(req,res,next)=>{
    const {_id} = req.payload;
    const { mountId }= req.params;
    const { comments} = req.body;
    console.log("body", req.body);



    const newComment = {
        username: _id,
        mount: mountId,
        comments,
    }

    try {
        await Comments.create(newMountComment);
        res.status(201).json("Added Comment")
    } catch (error) {
        next(error)
    }
});

router.get("/:mountId/comments", async(req,res,next)=>{
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