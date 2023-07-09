const express = require('express');
const app = express();
const {engine} = require('express-handlebars'); 

let taskList = [];

app.use(express.urlencoded({extended: true}));
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
    res.render('index', {
        taskList: taskList
    })
});

app.post("/", (req, res) => {
    if (req.body.task != "") {
        const newTask = {
           task: req.body.task
        };
        taskList.push(newTask);
    }
    res.redirect('/');
});

app.get("/reset", (req,res) => {
    res.send(taskList);
});

app.post("/reset", (req, res) =>  {
    taskList = [];
    res.redirect('/');
});

app.listen(3000, function() {
    console.log("Server is running.")
});