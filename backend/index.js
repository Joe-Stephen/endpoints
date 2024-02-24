const express = require('express');
const dotenv = require('dotenv').config();
const PORT = 5000 || process.env.PORT;
const app = express();

app.get('/',(req, res)=>{
    console.log('home page');
    const text = 'hello'
    res.json('Jello')
})

app.listen(PORT, (req, res)=>{
    console.log(`The server is running on ${PORT}`);
});
