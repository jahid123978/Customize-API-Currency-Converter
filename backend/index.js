const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 2000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ywrmz.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ywrmz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
console.log(uri);

async function main (){
  try{
      await client.connect();
      const database = client.db("CurrencyDb");
      const currencyCollection = database.collection("currencyCollection");
    
      app.get("/currency", async(req, res)=>{
        const result = currencyCollection.find({});
        const output = await result.toArray();
        res.json(output);
      })
         
  }
  finally{
    //   await client.close();
  }
}
main().catch(console.dir);



app.get('/', async (req, res) => {
    res.send("Converter server running");
})

app.listen(port, ()=>{
    console.log("listening on port " + port);
});