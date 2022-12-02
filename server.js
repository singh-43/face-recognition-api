const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex')
var validator = require("email-validator");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'face-recognition'
  }
});

const app = express();

app.use(bodyParser.json());  

app.use(cors())

// only when have a database variable to use
// app.get('/', (req, res)=> { res.send(database.users) })

app.post('/register',register.handleRegister(db,bcrypt,validator) )

app.post('/signin',signin.handleSignIn(validator,db,bcrypt) )

app.get('/profile/:id', profile.handleProfile(db) )

app.put('/image',(req,res)=>{ image.handleImage(req,res,db) })

app.post('/imageurl',(req,res)=>{ image.handleApiCall(req,res) })

const PORT = process.env.PORT
app.listen(PORT, ()=>{
	console.log(`Server is running on port ${PORT}`);
})