const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Minuli:Minuli1108@shopping.coke0.mongodb.net/todolist?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//get all

todoRoutes.route('/').get(async function(req, res) {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get by id

todoRoutes.route('/:id').get(async function(req, res) {
    try {
        const id = req.params.id;
        const todo = await Todo.findById(id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//add

todoRoutes.route('/add').post(async function(req, res) {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(200).json({ success: 'Todo added successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Adding new todo failed' });
    }
});

//update

todoRoutes.route('/update/:id').put(async function(req, res) {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(404).json({ error: 'Data not found' });
            return;
        }

        todo.title = req.body.title;
        todo.status = req.body.status;

        await todo.save();
        res.json('Todo updated');
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Update not possible' });
    }
});

//delete

todoRoutes.route('/delete/:id').delete(async function(req, res) {
    try {
      const todo = await Todo.findByIdAndRemove(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});