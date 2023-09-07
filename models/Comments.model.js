const { Schema, model, default: mongoose } = require("mongoose");


const commentSchema = new Schema({

    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mount:{
        type: String
    },
    comment: String
})


const Comments = model("Comments", commentSchema);

module.exports = Comments;