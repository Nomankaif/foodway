const express = require("express");
const path = require("path");
const multer = require('multer');
const app = express();
const hbs = require("hbs");
const Recipe = require("./models/rejister.js")
const fs = require('fs');
const PORT = process.env.PORT || 5000;
require("./db/conn.js");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); // specify the directory where you want to store the uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // rename the file if needed
  }
});
const upload = multer({ storage: storage });


const uploadDirectory = './public/uploads/';

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
// Set up view engine and static files
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partial = path.join(__dirname, "../templates/partials");
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partial);
console.log(staticpath);
console.log(templatepath);
console.log(partial)

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/recipe", (req, res) => {
  res.render("recipe");
});

app.post("/recipe", upload.single('image'), async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }

   
  
    // Get the image path with filename uploads/
     const imagePath = '/uploads/' + req.file.filename;


    // Create new Recipe document
    const registerRecipe = new Recipe({
      email: req.body.email,
      recipename: req.body.recipename,
      description: req.body.description,
      ingredientsone: req.body.ingredientsone,
      ingredientstwo: req.body.ingredientstwo,
      ingredientsthree: req.body.ingredientsthree,
      ingredientsfour: req.body.ingredientsfour,
      ingredientsfive: req.body.ingredientsfive,
      ingredientssix: req.body.ingredientssix,
      ingredientsseven: req.body.ingredientsseven,
      ingredientseight: req.body.ingredientseight,
      category: req.body.category,
      image: imagePath,
    });

    // Save the recipe
    const registered = await registerRecipe.save();
    res.status(200).render("home");
  } catch (err) {
    console.error("Error registering recipe:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/yourrecipe", async (req, res) => {
  try {
    let posts = await Recipe.find();
    res.render("yourrecipe", { posts });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

