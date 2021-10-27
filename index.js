const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zhcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// create a function for data add
async function run() {
    try
    {
        await client.connect()
        const database = client.db('network_volunteer');
        const volunteerCollection= database.collection('volunteers');

        //get api 
        app.get('/work', async (req, res) => {
            const cursor = volunteerCollection.find({})
            const result = await cursor.toArray()
            // console.log(result)
            res.send(result)
        })
    }
    finally
    {
        // await client.close();
    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`listening the port:${port}`)
})