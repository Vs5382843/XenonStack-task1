// Our Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Your MongoDB connection string
const mongoURL = 'mongodb+srv://Vikash:YwlGL5doU5fpTMC7@planti.mco9w.mongodb.net/?retryWrites=true&w=majority&appName=planti';

// Use async/await to handle the connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL); // Removed deprecated options
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error);
        process.exit(1); // Exit process with failure
    }
};


// Call the function to connect to MongoDB
connectDB();

// User Schema for MongoDB
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Model for the Users Collection
const User = mongoose.model('User', userSchema);

// Start the server
app.listen(3002, () => {
    console.log('Server is running on port 3002');
});

// Route to register a user using async/await
app.post('/register', async (req, res) => {
    const { Email, UserName, Password } = req.body;

    try {
        const newUser = new User({
            email: Email,
            username: UserName,
            password: Password
        });

        // Save the new user
        await newUser.save();
        console.log('User inserted successfully!');
        res.send({ message: 'User added!' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Route to login a user using async/await
app.post('/login', async (req, res) => {
    const { LoginUserName, LoginPassword } = req.body;

    try {
        // Find the user by username and password
        const user = await User.findOne({ username: LoginUserName, password: LoginPassword });

        if (user) {
            res.send(user);
        } else {
            res.status(401).send({ message: `Credentials don't match!` });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
