const express=require('express')
const router=express.Router()
const login=require('../model')
const { default: mongoose } = require('mongoose')
router.get('/',(req,res)=>{
    res.json("Its my Backend Learning")
})
//get all data
router.get('/get', async (req, res) => {
    console.log("reacged get path")
    try {
      const workouts = await login.find({}).sort({ createdAt: -1 });
      res.status(200).json(workouts);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//get a single data
router.get('/:id',async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workout'})
     }
    const workouts=await login.findById(id)

if(!workouts){
    res.status(404).json({error:"no such Workout"})
}
    res.status(200).json(workouts)
})
//login
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    console.log(username)
        console.log(password)
    login.findOne({username:username})
    .then(username=>{
        if(username){
            if(username.password==password){
                res.json("Success")
                 console.log("success login")
            } 
            else{
                console.log("wrong password")
        }
            
        }
        else{
            res.json("no record")
            console.log("fail")
    }
})
})
//create a single data signup
router.post('/newuser',async(req,res)=>{
    const {name,username,password,dob,gender,email,confirm}=req.body
    try {
        console.log(name,username,password,dob,gender,email,confirm)
        // Validate that password and confirm match
        if (password !== confirm) {
            return res.status(400).json({ error: "Password and confirm password do not match." });
        }
        console.log(confirm)
            const workouts=await login.create({name,username,password,dob,gender,email})
            res.status(201).json(workouts)
            console.log(workouts)
            console.log(name)

        }
            catch (error) {
res.status(401).json({error:error.message})
console.log(username)
    }
})

//delete a single data
router.delete('/:id',async(req,res)=>{
     const { id }=req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workout'})
     }
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workout'})
     }
    const workouts=await login.findOneAndDelete(id)
    res.json(workouts)
    // res.json('delete a single')
    if(!workouts){
        res.status(404).json({error:"no such Workout"})
    }
        res.status(200).json(workouts)
    })


//update a single data
router.patch('/:id',async(req,res)=>{
    const { id }=req.params

    // res.json('update a single')
    const workouts=await login.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workouts){
        res.status(404).json({error:"no such Workout"})
    }
        res.status(200).json(workouts)
    })
//search for the chat
router.post('/searchchat', async (req, res) => {
    console.log("reached the search chat")
    const username = req.body.username; 
    console.log(username);

    try {
        const users = await login.find({
            username: { $regex: username, $options: 'i' },
        });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//chat message strings
const Message = mongoose.model('Message', {
    sender: String,
    content: String,
  });
  


//chat message sending
router.post('/send-message', async (req, res) => {
    const { sender, content } = req.body;
  
    try {
      // Save the message to the database
      const newMessage = new Message({ sender, content });
      await newMessage.save();
  
      // Emit the message to all connected clients
      io.emit('receive-message', newMessage);
  
      // Respond with success
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  //get chat messages for display
  router.get('/get-messages', async (req, res) => {
    try {
      // Retrieve all messages from the database
      const messages = await Message.find();
  
      // Respond with the list of messages
      res.json(messages);
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports=router