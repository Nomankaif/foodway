let moongose=require("mongoose")
moongose.connect("mongodb+srv://mdnomankaif55:cb9FfRRiDiMbNwnp@cluster0.c6itu5v.mongodb.net/recipedb")
.then(()=>{
    console.log("connected to data base")
})
.catch((err)=>{
    console.log(err)

})