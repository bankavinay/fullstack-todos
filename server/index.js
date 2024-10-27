const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo'); // Ensure this points to your Todo model file

const app = express();
require("dotenv").config()
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO}`+ '/test')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Add a new Todo
app.post('/add', (req, res) => {
    const { task } = req.body;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get all Todos
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update a Todo's status
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true }) // Use { new: true } to return the updated document
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a Todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json({ message: 'Todo deleted successfully', result }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
const port = process.env.PORT; // Use PORT from env or default to 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const TodoModel = require('./models/Todo');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/test')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Todo routes (existing code)

// // User routes
// app.use('/api/users', userRoutes);

// // Start the server
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
