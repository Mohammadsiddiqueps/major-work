require('dotenv').config();

const express = require('express');
const app = express();
const mongoose=require('mongoose')
const PORT = process.env.PORT || 5000;
const workout=require('./routes/workouts')
const cors=require('cors')
//middleware
app.use(cors());
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/',workout)


//Connecting to Mongo db
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  //listening 
  app.listen(PORT, () => {
    console.log(`Connected  to the Database & Server is running on port ${PORT}!`);
  });

})
.catch((error)=>{
console.log(error)
})
 