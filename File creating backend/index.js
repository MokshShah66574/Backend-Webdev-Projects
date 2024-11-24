const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine" , 'ejs');
app.use(express.static(path.join(__dirname , "public")));

app.get("/" , function(req,res) {
    fs.readdir('./files' , function(err,filess){
        res.render("index" , {files:filess});
    })
});

app.post("/create-post" , function(req,res) {
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt` , `${req.body.content}`,function(err){
        res.redirect("/");
    })
});

app.get("/files/:name" , function(req,res) {
    const filename = req.params.name;
    
    fs.readFile(`./files/${filename}`, function(err, content){
        // console.log(err)
        const post={title:filename , content : content}
        res.render("post" , {post});
    });
});



app.listen(3000);