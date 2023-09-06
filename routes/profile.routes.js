const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const User = require("../models/User.model");
const MountTracker = require("../models/MountTracker.model")

const uploader = require("../middlewares/Cloudinary")


router.get("/my-profile",isAuthenticated, async (req,res,next)=>{
    
    try {

        
        const user = await User.findById(req.payload._id)

        if(!user){
            return res.status(400).json({errorMessage: "user not found"})
        }

        return res.json({user})
    } catch (error) {
        next(error)
    }
})


// GET que muestra todos los usuarios
router.get("/all-profiles", async (req,res,next) =>{
    try {
        const response = await User.find();
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
});

//GET que muestra los detalles de un usuario en especifico

router.get("/:userId/details" , async (req,res,next) =>{
    const {userId} = req.params
    try {
        const response = await User.findById(userId);
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

router.get("/myFavorite" , async (req, res, next)=>{
    try {
        const response = await User.findById(req.payload._id).populate(
            "mounttrackers"
        );
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})







module.exports = router;