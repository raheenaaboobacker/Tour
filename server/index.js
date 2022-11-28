const express= require('express')
const cors= require('cors')
const mongoose= require('mongoose')
const morgan= require('morgan')

const userRouter=require('./routes/user.js')
const tourRouter=require('./routes/tour.js')

const app=express();

app.use(express.json({limit:"30mb",extended :true}))
app.use(express.urlencoded({limit:"30mb",extended :true}));
app.use(cors());

app.use('/users',userRouter)
app.use('/tour',tourRouter)

const MONGODB_URL=
"mongodb://raheena:raheena%40123@cluster1-shard-00-00.zmtjd.mongodb.net:27017,cluster1-shard-00-01.zmtjd.mongodb.net:27017,cluster1-shard-00-02.zmtjd.mongodb.net:27017/tour?ssl=true&replicaSet=atlas-5vyr6c-shard-0&authSource=admin&retryWrites=true&w=majority"


const port=5000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`);
    })
}).catch((error)=>{
    console.log(` ${error} did not connect`); 
})

