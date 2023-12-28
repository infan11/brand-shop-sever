const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


// middle were

app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lopynog.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();
const productCollection  = client.db("brandShop").collection("product")
const productsCollection  = client.db("brandShop").collection("products")

app.get("/product" , async(req, res) =>{
    const result= await productCollection.find().toArray()
    res.send(result)
})
app.get("/products/:id" , async(req, res) =>{
    const result= await productCollection.findOne({_id:new ObjectId(req.params.id)})
    console.log(result);
    res.send(result)
})
app.get("/products", async (req, res) =>{
  const cursor = productsCollection.find();
  const result = await cursor.toArray()
  res.send(result)
})
app.post("/products" , async (req, res) =>{
  const product = req.body;
 const result = await productsCollection.insertOne(product)
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


app.get("/", async(req, res) =>{
    res.send("Brand shop server in running")
})
app.listen(port, () =>{
    console.log(`simple crud server port: ${port}`);
})