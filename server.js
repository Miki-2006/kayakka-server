const express = require('express')

const app = express()


app.get('/', (req, res) => {
    res.send('Hello Mirlan!')
})


app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next()
})


app.listen(5000, () => console.log('Server is running: http://localhost:5000/'))