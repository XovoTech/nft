const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('./untils/db')
const cors=require('cors');
const route  = require('./routes');
const port=8000;


app.use(cors())
app.use(express.json());

app.use('/api',route)

app.listen(port,()=>{
    console.log('listeninig ',port)
})