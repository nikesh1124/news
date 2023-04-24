// 
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const _=require('lodash')
const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

let homecontent = "A daily journal is a tool used to record thoughts, ideas, experiences, and emotions on a regular basis. It is a form of personal reflection and self-expression that helps individuals become more self-aware and gain clarity about their lives. Daily journaling can be therapeutic and provide a sense of release from stress and anxiety. It also helps to track progress towards personal goals and identify areas for improvement. By developing a consistent journaling practice, individuals can cultivate mindfulness and a deeper understanding of their inner selves. Overall, a daily journal is a powerful tool for self-discovery and personal growth.";
let aboutcon="Welcome to my journal vlog page! This platform will document my daily life, thoughts, and experiences. I hope to connect with others and create a community where we can share stories and support each other. Expect raw and unfiltered content, exploring topics such as mental health, self-care, and personal growth. Let's start conversations and share resources together. Thank you for joining me on this journey!";

let contactcon="We value your feedback and suggestions. Whether you have questions, comments or just want to say hello, please feel free to contact us. You can reach us through the form provided on this page or via email at [insert email address]. We strive to respond to all inquiries as soon as possible, but please allow up to 48 hours for a response. Follow us on [insert social media platforms] to stay up-to-date on our latest content and engage with our community. At our core, we are dedicated to creating a safe and inclusive space for everyone. Please do not hesitate to reach out if you have any concerns or suggestions for how we can improve. Thank you for being a part of our journey.";

let posts=[];

app.get('/', (req, res) => {
    res.render("home",{ 
        key: homecontent ,
        kcont:posts
     });
})

app.get('/about',(req,res)=>{
    res.render("About",{key:aboutcon})
})

app.get('/contact',(req,res)=>{
    res.render("Contact",{key:contactcon})
})

app.get('/compose',(req,res)=>{
    res.render("compose")
})

app.post('/compose',(req,res)=>{
    let post={
        title:req.body.titlename,
        content:req.body.bodycon
    };
    posts.push(post);
    res.redirect('/');
})

app.get('/posts/:filename',(req,res)=>{
    let match=_.lowerCase(req.params.filename);
    posts.forEach((item)=>{

        if(_.lowerCase(item.title)===match){
            res.render('post',{
                title:item.title,
                content:item.content

            })
        }
    })
})

app.listen(80, () => {
    console.log("server Start")
})