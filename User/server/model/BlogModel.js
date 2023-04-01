const mongoose = require("mongoose");
var BlogSchema = new mongoose.Schema({
    Title:{
        type:String,

    },
    MetaTitle:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true

    },
    MetaDescription:{
        type:String,
        required:true

    },
    ImageUrl:{
        type:String,
        required:true
    },
    ViewsCount:{
        type:Number
    }
    
},{
    timestamps:true
})


exports.blogdb = mongoose.model('blogdb', BlogSchema)