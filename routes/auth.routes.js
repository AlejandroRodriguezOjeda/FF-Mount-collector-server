
const bcrypt = require("bcryptjs")
const router = require("express").Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");


//POST /auth/signup => registrar al usuario

router.post("/signup", async (req, res, next)=>{

    const{username, email, password} = req.body
    console.log(req.body);

    if(!username || !email || !password){
        res.status(400).json({errorMessage: "Must fill in all fields!"})
        return;
    }

    try{
        const userfound = await User.findOne({
            $or: [{email: email}, {username: username}]
        })
        if(userfound !== null){
            res.status(400).json({errorMessage: "this user already exists!!"})
        }
        



    }
    catch(error){
        next(error)
    }

    try {
         const salt = await bcrypt.genSalt(10)
         const hashPassword = await bcrypt.hash(password,salt)
         console.log(hashPassword);


         await User.create({
            username,
            email,
            password: hashPassword
         })



         res.json("usuario creado")
    } catch (error) {
        next(error)
    }
})

//POST /auth/login => validar credenciales

router.post("/login", async (req,res,next)=>{

    const {email, password} = req.body
// Busca si el correo esta en la DB
    try {
        
        const foundUser = await User.findOne({email})
        console.log(foundUser);

        if (foundUser === null){
            res.status(400).json({errorMessage: "User does not exist"})
            return;
        }
// verifica que la password este correcta

        const correctPassword = await bcrypt.compare(password,foundUser.password)
        if (correctPassword === false){
            res.status(400).json({errorMessage: "Password does not match"})
            return;
        }

        // Crear la sesion/token

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            username: foundUser.username
        }

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "3d"}
        )

        res.json({authToken})

    } catch (error) {
        next(error)
    }

})

//GET /auth/verify => indicar al FE que el usario esta activo a llamadas futuras 

router.get("/verify", isAuthenticated, (req,res,next) => {


    console.log(req.payload);

    res.json(req.payload)
})

module.exports = router;