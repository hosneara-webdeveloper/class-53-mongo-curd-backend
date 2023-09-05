const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require ('cors')
//node js environment variable 
require('dotenv').config();

const app = express()
const port =process.env.PORT || 5000

// middleware

app.use(cors())

app.use(express.json()); // Undefined solved



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q0s8i3u.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

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
    const database = client.db('class-53-mongo-CURD')
    const userCollection = database.collection('Users');
    const ordersCollection = database.collection('Order');
    //const user = {name: 'text', email: 'text@gmail.com'}
    //const send = await userCollection.insertOne(user);
    //console.log(send);

    // user get
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query); // object of object
      const users = await cursor.toArray(); // array of object
      res.send(users)
    })

    //user add via POST
    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result)
      console.log(result);
    })

    
  } finally {
    
    // under this line have to off
    //await client.close();
  }
}
run().catch(error => console.log(error));





app.get('/', (req, res) => {
  res.send('Hello CURD Operation!')
})



app.listen(port, () => {
  console.log(`Our CURD Operation run on port ${port}`)
})