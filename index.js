const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const path=require("path");
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



const publicDirPath=path.join(__dirname,'public');
app.use(express.static(publicDirPath));

const SignupCollection = require('./singupMongo');


app.get('/',(req,res)=>{
    res.sendFile(publicDirPath + '/signup.html')
})
// app.get('/signup',(req,res)=>{
//     res.sendFile(publicDirPath + '/signup.html')
// })
app.get('/login',(req,res)=>{
    res.sendFile(publicDirPath + '/login.html')
})
app.post('/signup_submit',async (req,res)=>{

    const data={
        name:req.body.name_signup,
        mobile:req.body.mobile_signup,
        email:req.body.email_signup,
        password:req.body.password_signup
    }

    try{
        await SignupCollection.insertMany([data]);
        console.log("data inserted")
        res.redirect('/login');

    }
    catch(e)
    {
        console.log(e);
    }

})

// app.post('/login_submit',async (req,res)=>{
//     const email_login = req.body.email_login;
//     const password_login=req.body.password_login;

//     try{
//         const email= await SignupCollection.findOne({email:email_login});
//         const password=await SignupCollection.findOne({ password:password_login});

//         if (email && password){
//             console.log("data got")
//             res.send("login successful");
//         } 
//         else {
           
//             res.status(401).send('Unauthorized');
//     }}
//     catch(e){
//             console.log(e);
//             res.status(500).send('Internal Server Error');
//     }

// })


app.post('/login_submit', async (req, res) => {
    const { email_login, password_login } = req.body;

    try {
        // Query the database to find a user with the provided email
        const user = await SignupCollection.findOne({ email: email_login });
        console.log(user)
        if (!user) {
            // If no user found, return an error
            return res.status(400).send('Invalid email or password');
        }

        // Compare the provided password with the stored password hash
        if (password_login !== user.password) {
            // If passwords don't match, return an error
            return res.status(400).send('Invalid email or password');
        }

        // At this point, authentication is successful
        // You can set up a session or generate a token for the authenticated user
        // For now, let's just send a success message
        res.send('Login successful');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(5000,()=>{
    console.log("connected");
})