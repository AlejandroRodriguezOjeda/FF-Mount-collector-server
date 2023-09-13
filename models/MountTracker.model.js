const { Schema, model, default: mongoose } = require("mongoose");



const mountTrackerScheema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mount:{
        type:String,
    },
  notes:{
        type: String
    },
    status:{
        type: String,
        enum: ['owned', 'not owned']
    },
    isfavorite:{
        type: Boolean
    }
})


const MountTracker = model("MountTracker", mountTrackerScheema);

module.exports = MountTracker
