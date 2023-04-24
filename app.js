//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {MongoClient} = require("mongodb");
const { ifError } = require("assert");

const app = express();

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

// MongoDB server const
const uri = "mongodb+srv://usamah_kk:1KN8pkiP9gAgE3b4@cluster0.kg9dwcn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "myAuthentification";
const collectionName = "user";
const database = client.db(dbName);
const collection = database.collection(collectionName);

app.get("/", function(req,res){
    res.render("home")
});

app.get("/login", function(req,res){
    res.render("login")
});

app.get("/register", function(req,res){
    res.render("register")
});

// Register page
app.post("/register",async function(req,res){
    const newUser = {
        email: req.body.username,
        password: req.body.password,
    };
    try {
        await client.connect();
        await collection.insertOne({email: newUser.email, password: newUser.password});
        res.render("secrets");
    } catch (err) {
        console.log(err) 
    }
});

// Login page
app.post("/login",async function(req,res){
    const login = {
        email: req.body.username,
        password: req.body.password,
    };
    try {
        await client.connect();
        const foundUser = await collection.findOne({email: login.email});
        if (foundUser) {
            if (foundUser.password == login.password) {
                console.log("password matches");
                res.render("secrets")
            } else {
                console.log("password doesnt match")
            }
        } else {
            console.log("cant find user")
        }
    } catch (err) {
        console.log(err);
        res.send("error occured")
    }
});



app.listen(3000, function(){
    console.log("Server started on port 3000")
})
