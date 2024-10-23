const express = require('express')
var bodyParser = require('body-parser')
const cors = require("cors");
const app = express()
const port = 7000

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'stdactivity_2567',
  },
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// parse application/json
app.use(bodyParser.json())

//cors
app.use(cors()); 
// http://localhost:7000/list
app.get('/list',async (req, res) => {
  console.log('user=', res.query)
   let row = await knex('student');
   res.send({
   'status': "ok",
   datas: row 
  })
})

// http://localhost:7000/insert
app.get('/insert',(req,res) => {
  console.log('insert',req.body)
  res.send('insert OK')
})

// http://localhost:7000/login
app.post('/login',(req,res) => {
  //req.query => get
  //req.body => post
  console.log('username && password', req.body)
  res.send('login OK')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})