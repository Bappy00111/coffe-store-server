const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

// midlewears 
app.use(cors())
app.use(express.json())


console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
// vew code sample 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jqnstr5.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // crate a collaction 
    const coffeCollation = client.db('coffeeDB').collection('coffee')


    // server side get method 

    app.get('/coffee',async(req,res)=>{
      const cursor = coffeCollation.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    
    // server side psot method 
    app.post('/coffee',async(req,res)=>{
      const newCoffe = req.body;
      console.log(newCoffe)
      const result = await coffeCollation.insertOne(newCoffe)
      res.send(result)
    })
    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
  res.send('running server')
})


app.listen(port,()=>{
    console.log(`conunteded port : ${port}`)
})