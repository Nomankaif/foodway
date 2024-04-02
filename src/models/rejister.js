let mongoose=require("mongoose");

let dishes=mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    recipename:{
     
        type:String,
        required:true,
    },
    
    description:{
        type:String,
        required:true
    },

    ingredientsone:{
        type:String,
    },
    ingredientstwo:{
        type:String,
    
    },
    ingredientsthree:{
        type:String,
    },
    ingredientsfour:{
        type:String,
    },
    ingredientsfive:{
        type:String,
    },
    ingredientssix:{
        type:String,
    },
    ingredientsseven:{
        type:String,
    },
    ingredientseight:{
        type:String,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    }


})

let Recipe= new mongoose.model("Recipe",dishes)
module.exports=Recipe