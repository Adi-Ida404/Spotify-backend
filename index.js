const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users'); // Ensure this path is correct

const app = express();
const port = 9000;

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://adityarawat:adityarawat47@cluster0.5ezocvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the /SignUp endpoint
app.post('/SignUp', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.post('/Login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password ){
                res.json("Success")
            }else {
                res.json("the password is incorrect")
            }
        }else{
            res.json("No user found")
        }
        })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
