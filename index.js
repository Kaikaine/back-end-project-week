const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const cors = require('cors')
const server = express();
const bcrypt = require('bcryptjs');
const dbConfig = require('./knexfile')
const jwt = require('jsonwebtoken')
const session = require('express-session');
const jwtKey = require('./secret/keys').jwtKey;

const db = knex(dbConfig.development);


server.use(session(sessionConfig))
server.use(express.json());
server.use(helmet());
server.use(cors())

const generateToken = user => {
    const payload = {
        username: user.username
    }

    const options = {
        expiresIn: '1h',
        jwtid: '54321'
      }

    const token = jwt.sign(payload, jwtKey, options)
    return token
}

const protected = (req, res, next) => {

    const token = req.headers.authorization

    token ?
        jwt.verify(token, secret, (err, decodedToken) => {
            err ?
                res.status(401).json({ message: 'invalid username or password' })
                :
                req.username = decodedToken.username
            next()
        })
        :
        res.status(401).json({ message: 'invalid username or password' })

}

server.get('/', (req, res) => {
    res.send('Api Online')
})

// route for registering
server.post('/api/register', (req,res) => {

})

// route for logging in
server.post('/api/login', (req, res) => {

})

//  route for making notes
server.post('/api/create', (req, res) => {

})

// route for getting the right notes for user
server.get('/api/user', protected, (req,res) => {

})

// route for viewing each indiviual note
server.get('/api/view/:id', (req, res) => {

})

// route for deleting a note
server.delete('/api/view/:id/delete', (req, res) => {

})

// route for editing notes
server.put('/api/edit', (req, res) => {

})



const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});