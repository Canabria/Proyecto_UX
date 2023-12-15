/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
const express = require('express');
const path = require('path');
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } = require("firebase/auth");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://jafetmorel:HsUeQo5lPEBkhkDe@proy.ujf1bdk.mongodb.net/?retryWrites=true&w=majority";

const firebaseConfig = {
  apiKey: "AIzaSyC_TOxCLusY9MoIE3-oQQsOrDrYmRK-hnA",
  authDomain: "proyectoux-60160.firebaseapp.com",
  projectId: "proyectoux-60160",
  storageBucket: "proyectoux-60160.appspot.com",
  messagingSenderId: "235361427007",
  appId: "1:235361427007:web:64dd87f15281e2c962628a",
  measurementId: "G-8K9B1H9M76",
};


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const servidor = express();
var urlEncodeParser = bodyParser.urlencoded({ extended: true });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

let port = 3001;

const firebaseApp = initializeApp(firebaseConfig);
servidor.use(urlEncodeParser);
servidor.use(cors());

servidor.listen(port, () => {
  console.log('Servidor ejecutandose correctamente en el puerto: ', port);
});

servidor.get('/getAirbnb', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    const mainDB = client.db("test");
    const Post = mainDB.collection("airbnb");
    const query = {};
    const options = {
      projection: { _id: 0, pais: 1, ciudad: 1, calle: 1, numero: 1, currentOwner: 1 },
    };
    const cursor = Post.find(query, options);
    let arr = []
    for await (const doc of cursor) {
      console.dir(doc);
      arr.push(doc)
    }
    res.status(200).send({
      documentos: arr,
    });

  } catch (error) {
    res.status(500).send("No se pudo ejecutar la query...")
    console.log(error);
  } finally {
    await client.close();
  }
})

servidor.put('/updateAirbnb',async (req,res)=>{
  try {
    const client = new MongoClient(uri);
    const database = client.db("test");
    const usuarios = database.collection("airbnb");
    const filter = { calle: req.body.calle, numero: req.body.numero};
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        currentOwner: req.body.currentOwner
      },
    };
    const result = await usuarios.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    res.status(200).send("Se actualizo la informacion correctamente");
  }catch (error){
    res.status(500).send("No se pudo actualizar la información")
  } finally {
    await client.close();
  }
   
} )
