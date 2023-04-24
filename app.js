//jshint esversion:6
// Requires modules
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

// Session
app.use(session({
    secret: "this my little secret",
    resave: false,
    saveUninitialized: false,
}));

// Pasport initilazed and session
app.use(passport.initialize());
app.use(passport.session());

// MongoDB atlas URI
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.kg9dwcn.mongodb.net/myAuthentification`

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

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
// Pasport Local mongoose
userSchema.plugin(passportLocalMongoose);

// Mongoose model based on userSchema
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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
app.get("/secrets",function(req,res){
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});
app.get("/logout", function(req,res){
    req.logout(function(err){
        if (err) {
            console.log("An error occurred during logout:", err);
        } else {
            res.redirect("/")
        }
    });
});

// Register page
app.post("/register", async function(req,res){
    try {
        await User.register({username: req.body.username}, req.body.password);
        await passport.authenticate("local")(req,res,function(){
            // Redirect to /secrets after successful registration and authentication
            res.redirect("/secrets")
        });
    } catch (err) {
        console.log("somthing went wrong when trying to register", err);
        res.redirect("/register")
    }
});

// Login page
app.post("/login",async function(req,res){
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    try {
        req.login(user, function(err){
            if (err) {
                console.log("An error occurred during login:", err);
            } else {
                passport.authenticate("local")(req, res, function() {
                    res.redirect("/secrets");
                  });
            }
        });
      } catch (error) {
        console.log("An error occurred during login:", error);
      }
});

// Listen Port
app.listen(3000, function(){
    console.log("Server started on port 3000")
})
