//jshint esversion:6
// Requires modules
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require('md5');

const app = express();

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.kg9dwcn.mongodb.net/myAuthentification`

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });

// Mongoose model based on userSchema
const user = new mongoose.model("user", userSchema);

// Getting home, login and register page
app.get("/",function(req,res){
    res.render("home");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.get("/login",function(req,res){
    res.render("login");
});

// Connect to Database mongoDB atlas using mongoose.connect
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Register page
app.post("/register", async function(req,res){

    try {
        const newUser = new user ({
            email: req.body.username,
            password: md5(req.body.password),
        });
        await newUser.save();
        res.render("secrets")
        console.log("Succesfully add newUser");
    } catch (err) {
        console.log("Failed to create newUser")
    }
});

// Login page
app.post("/login",async function(req,res){
    const login = {
        email: req.body.username,
        password: md5(req.body.password),
    };
    try {
        const foundUser = await user.findOne({email: login.email})
        if (foundUser) {
            if (foundUser.password === login.password) {
                res.render("secrets");
                console.log("Password matches")
            } else {
                console.log("Password doesnt matches")
            }
        } else {
            console.log("user not found")
        }
    } catch (err) {
        console.log("error occured",err)
    }
});

// Listen Port
app.listen(3000, function(){
    console.log("Server started on port 3000")
})
