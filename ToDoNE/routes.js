const express = require('express')
const mysql = require ('mysql')
const router = express.Router()
 
const pass = 'password'


function getConnection() {
    return mysql.createConnection({
        host:'localhost',
        port:'3306',
        user: 'root',
        password:'root',
        database: 'todoapp' //USE Todo; Select * from todos
    })
}

const con = getConnection()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/get_todos', (req, res) => {
    const queryString = "SELECT * FROM todos WHERE complete = '0'"
    conn.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('Failed to query @ /get_todo: ' + err)
        }
        console.log('Getting data from database @ /get_todos')
        res.json(rows)
    })
})

routher.post('/complete_todo/:id', (req, res) => {
    const todo_id = req.params.id
    const queryString = "UPDATE todos SET complete = '1' WHERE todo_id = ?"
    con.query(queryString, [todo_id] (err, rows, fields) => {
        if (err) {
            console.log('Failed to query at /complete_todo/: ' + todo_id + " " + err)
        }
        console.log("@/complete_todo/ Completing todo with id " + todo_id)
        res.redirect('/')
    })
})

router.post('/add_todo', (req, res) => {
    const todo_id = req.body.add_todo_input

    const queryString = "INSERT INTO todos (todo) VALUES (?)"
    con.query(queryString, [todo_id], (err, rows, fields) => {
    if (err) {
        console.log("Failed to insert at /add_todo/: " + todo + " " + err)
    }
    console.log("@/add_todo todo " + todo + " added.")
    res.redirect('/')
    })
})

module.exports = router