const model= require("../model/BlogModel");
const fs = require("fs")
var blogdb = model.blogdb;

exports.CreateBlog = async (req,res)=>{
    try{
        if(!req.body){
            res.status(400).json({message:"content cannot be empty"});
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
    
        const newuser = new blogdb({
            Title:req.body.Title,
            MetaTitle:req.body.MetaTitle,
            MetaDescription:req.body.MetaDescription,
            Description:req.body.Description,
            ImageUrl:imagePath[0]?imagePath[0]:null,
            ViewsCount:0,
        });

        await newuser.save();
        res.status(200).send("blog data created scucessfully")
    }
    catch(err){
        res.status().send("error occured");
    }

}
exports.FindBlog = async(req,res)=>{
    try{
        if(req.query.id){
            let blog  = await blogdb.findOne({_id:req.query.id});
            blog.ViewsCount+=1;
            await blog.save();
            res.status(200).send(blog);
        }
        else if(req.query.trending){
            let blog = await blogdb.find().sort({ViewsCount:-1})
            res.status(200).send(blog);

        }
        else{
            let blog = await blogdb.find().sort({updatedAt:1});
            res.status(200).send(blog);

        }
    }
    catch(err){
        res.status(500).send(err);
    }
    
}

exports.DeleteBlog = async (req,res)=>{
    try{
        const id = req.params.id;
        let blog  = await blogdb.findOne({id});
        if (blog.ImageUrl && blog.ImageUrl !== null) {
            const path = "public/" + blog.ImageUrl.slice(process.env.BASE_URL.length, blog.ImageUrl.length)
            fs.unlinkSync(path);
        }
        await blogdb.findByIdAndDelete(id);
        res.status(200).send("data deleted succesfully");
    }
    catch(err){
        res.status(500).send(err);
        
    }
}

exports.UpdateBlog = async (req,res)=>{
    try {
        if(!req.body){
            res.status(500).status("Data needed to update.")
            return ;
        }
        
        const id = req.params.id

        const blog = await blogdb.findOne({_id:id});
        if(req.files.image !==undefined){
            if (blog.ImageUrl && blog.ImageUrl !== null) {
                const path = "public/" + blog.ImageUrl.slice(process.env.BASE_URL.length, blog.ImageUrl.length)
            
                //to delete the previously existing image, if exists
                try {
                  fs.unlinkSync(path);
                  //file removed
                } catch (err) { }
            }
        }
        else{
            imgUrl = blog.ImageUrl
        }
        await blogdb.findByIdAndUpdate(id,{
            Title:req.body.Title,
            MetaDescription:req.body.MetaDescription,
            Description:req.body.Description,
            ImageUrl:imgUrl
            
        })
    } catch (err) {
        res.json(err)
        
    }


}