const express = require("express")
const app= express();
const port=3000;
const path = require("path");

const { v4: uuidv4 } = require('uuid'); // universally unique identfier

const methodOverride = require('method-override')
//var app = express()
 
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"))


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies  
 app.use(express.urlencoded({ extended: true }))

let posts=[
    {   id:uuidv4(),
        username:"apnacollege",
        content:"i love u"
    },
    {   id:uuidv4(),
        username:"kamal",
        content:" kamal loves shradha "
    },
    {   id:uuidv4(),
        username:"shraddha",
        content:"shraddha loves kamal "
    }

]
// atv endpoints use NOUNS instead of verbs
// like see posts xxxx 
// use posts


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})


app.post("/posts",(req,res)=>{
   // let {username,content}=req.query;
   let { username, content } = req.body;
    let id=uuidv4();
   posts.push({id,username,content});
    console.log(req.body);
   // res.send("POST request working")
   res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id ) ;
    console.log(post);
   // res.send("request working")
   res.render("show.ejs",{post} )
   
 })

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newCotent=req.body.content;
    let post =posts.find((p)=>id ===p.id);
    post.content=newCotent;
    console.log(post);
//    res.send("patch request working");
res.redirect("/posts")
})


 app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id ===p.id ) ;
    res.render("edit.ejs",{post} )
 } )


//with HTML forms we can only send post / get requests upon submissin
//we can't send put/post/delete request




app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
 posts=posts.filter((p)=> id !==p.id ) ;
    // will give out all the posts whose id is not equal ti this id

 //   res.send("delete success!!");
 res.redirect("/posts")

})

app.listen(port,()=>{
    console.log(`app is listening on ${port} `)
})