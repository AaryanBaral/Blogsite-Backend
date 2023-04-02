const model= require("../model/TestimonialModel");
const fs = require("fs");
var testimonialdb = model.testimonialdb;
exports.CreateTestimonial = async (req,res)=>{
    try{
        if(!req.body){
            res.status(400).json({message:"content cannot be empty"})
            return;
        }
        let imagePath = [];
        if(req.files){
            if(Array.isArray(req.files.image)&& req.files.image.length>0){
                for(let image of req.files.image){
                    imagePath.push(process.env.BASE_URL + "images/" + image.filename);
                }
            }
        }

        const newuser = new testimonialdb({
            Name:req.body.Name,
            Designation:req.body.Designation,
            Testimony:req.body.Testimony,
            ImageUrl:imagePath[0]
        })

        await newuser.save()
        res.status(200).send("data inserted.")
    }
    catch(err){
        res.status(500).send("data not created. ")
    }
}

exports.FindTestimonail = async (req,res)=>{
    try{
        if(req.query.id){
        let data = await testimonialdb.findOne({_id:req.query.id})
        res.status(200).send(data)
        }
        else if(req.query.name){
            let data = await testimonialdb.findOne({Name:req.query.name})
            res.status(200).send(data)
            
        }
        else{
            let data = await testimonialdb.find()
            res.status(200).send(data)
            
        }
    }
    catch(err){
        res.status(500).send("cannot find data.")

    }
}

exports.DeleteTestimonial = async (req,res)=>{
    try{
        const id = req.query.id;
        if(!data){
            res.status(404).json({message:"invalid user id"})
            return;
        }
        else{
            if (testi.ImageUrl && testi.ImageUrl !== null) {
                const path = "public/" + testi.ImageUrl.slice(process.env.BASE_URL.length, testi.ImageUrl.length)
                
                //to delete the previously existing image, if exists
                try {
                    fs.unlinkSync(path);
                    //file removed
                } catch (err) { }
            }
            await testimonialdb.findByIdAndDelete(id)
            res.json({message:"id deleted sucessfuly"}).status(200)

            }
    }
    catch(err){
        res.status(500).send("Data cannot be deleted.")
    }
}

exports.UpdateTestimonial = async(req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Pleease provide some information")
            return ;
        }
        
        
        const id = req.query.id
        const testi = await testimonialdb.findById(id);

        imgUrl = testi.ImageUrl
        if(req.files.image !==undefined){
            if (testi.ImageUrl && testi.ImageUrl !== null) {
                const path = "public/" + testi.ImageUrl.slice(process.env.BASE_URL.length, testi.ImageUrl.length)
            
                //to delete the previously existing image, if exists
                try {
                  fs.unlinkSync(path);
                  //file removed
                } catch (err) { }
              }
            let imagePath = []
            if(Array.isArray(req.files.image)&& req.files.image.length>0){
                for(let image of req.files.image){
                    imagePath.push(process.env.BASE_URL + "images/" + image.fileName)
                }
                imgUrl = imagePath[0]
            }
            else{
                imgUrl = null
            }
        }
        else{
            imgUrl = testi.ImageUrl
        }

        await testimonialdb.findByIdAndUpdate(id,{
            Name:req.body.Name ? req.body.Name:testi.Name,
            Designation:req.body.Designation?req.body.Designation:testi.Designation,
            Testimony:req.body.Testimony?req.body.Testimony:testi.Testimony,
            ImageUrl:imgUrl
        })
        res.status(200).send("data updated.")
        

    } catch (err) {
        res.status(500).send("data not updated!")
        
    }
}