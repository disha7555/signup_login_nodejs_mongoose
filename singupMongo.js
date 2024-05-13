const mongoose=require("mongoose");
const url='mongodb+srv://disha:DKMongo%407555@cluster0.ssh4wdp.mongodb.net/FormData';
const urii='mongodb+srv://disha:DKMongo%407555@cluster0.ssh4wdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/FormData'
mongoose.connect(url)
.then(()=>{
    console.log("database connected");
}).catch((e)=>{
    console.log('failed');
})

const signupSchema = new mongoose.Schema({
    name:{
            type:String,
            required:true
    },
    mobile:{
            type:Number,
            required:true
    },
    email:{
            type:String,
            required:true
    },
    password:{
            type:String,
            required:true
}
})

const SignupCollection = new mongoose.model('SignupCollection',signupSchema);

module.exports=SignupCollection;