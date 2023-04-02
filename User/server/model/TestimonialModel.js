const mongoose = require("mongoose");
var TestimonialSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
    },
    Testimony:{
        type:String,
        required:true
    },
    ImageUrl:{
        type:String
    },
})


exports.testimonialdb = mongoose.model('testimonialdb', TestimonialSchema)