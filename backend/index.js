const express = require('express');
const dotenv = require('dotenv').config();
const connectDB=require('./config/db');
const PORT = process.env.PORT || 5000;
var cors= require('cors');


const app = express();
connectDB();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',require('./userSide/routes/userRoutes'));
app.use('/admin',require('./adminSide/routes/adminRoutes'));
app.use('/collector',require('./collectorSide/routes/collectorRoutes'));

app.listen(PORT, ()=>console.log(`The server is running on ${PORT}`));