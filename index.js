const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// midlewears 
app.use(cors())
app.use(express())

app.get('/',(req,res)=>{
    res.send('running server')
})

app.listen(port,()=>{
    console.log(`conunteded port : ${port}`)
})