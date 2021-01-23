// jshint esversion:6
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");

mongoose.connect('mongodb://localhost/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const homeStartingContent = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const aboutContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, , comes from a line in section 1.10.32.";

const contactContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// creating new schema in mongoose
let posts = [];

const postSchema = new mongoose.Schema({
    title: String,
    content: String
    
});

// creating new model in mongoose
const Post = mongoose.model("Post", postSchema);


//saving inserted data in DB mongoose 
app.post("/compose", function(req, res){
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save();
    res.redirect("/");

});

// rendering compose page
app.get("/compose", function(req, res){
    res.render("compose");
});

// render home with journals from database
app.get("/",function(req, res){
    Post.find({}, function(err, posts){
        res.render("home",{
            startingContent: homeStartingContent,
            journal: posts
        });
    });

});

// rendering the post to homepage
app.post("/", function(req, res){
    res.render()
});

// acessing full contents of each journal usng ReadMore href
app.get("/posts/:postId", function(req, res){
    const requestedPostId = req.params.postId;


    Post.findOne({_id:requestedPostId}, function(err, post){
        res.render("postt", {
            journalTitle: post.title,
            journalContent: post.content
        });
    });
}); 
    

// rendering about
app.get("/about", function(req, res){
    res.render("about", {abContent: aboutContent});
    
});

// rendering contact
app.get("/contact", function(req, res) {
    res.render("contact", {communicate: contactContent});
});

// checking the server initially
app.listen(3000, function(){
    console.log("Server started on port 3000");
});