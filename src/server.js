/*eslint-disable quotes *//* eslint-disable prettier/prettier */
const express = require('express');
const path = require('path'); 
const {initializeApp} = require("firebase/app");
//const {getAnalytics} = require("firebase/analytics");
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification} = require("firebase/auth");
const axios = require('axios');

//MONGODB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://emicantarero:Hernandez09@examenux.aotz8sy.mongodb.net/?retryWrites=true&w=majority";
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
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
run().catch(console.dir);

const firebaseConfig = {
  apiKey: "AIzaSyC_TOxCLusY9MoIE3-oQQsOrDrYmRK-hnA",
  authDomain: "proyectoux-60160.firebaseapp.com",
  projectId: "proyectoux-60160",
  storageBucket: "proyectoux-60160.appspot.com",
  messagingSenderId: "235361427007",
  appId: "1:235361427007:web:64dd87f15281e2c962628a",
  measurementId: "G-8K9B1H9M76",
};

const servidor = express();
var urlEncodeParser = bodyParser.urlencoded({extended:true});

let port = 3001;

const firebaseApp = initializeApp(firebaseConfig);
servidor.use(urlEncodeParser);
servidor.use(cors());

servidor.listen(port, ()=>{
    console.log('Servidor ejecutandose correctamente en el puerto: ', port);
});

servidor.get('/', function (req, res) {
  res.send('Hello World, como estan?')
});

servidor.post("/createUserWithEmailAndPassword",  (req, res) => {
  const auth = getAuth(firebaseApp);
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then((resp) => {
        res.status(200).send({
        msg: "Usuario creado exitosamente",
        data: resp,
      });
      sendEmailVerification(auth.currentUser).then(()=>{
        console.log('Se envio el correo de verificacion');
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).send({
        msg: "Error al crear el usuario",
        errorCode: errorCode,
        errorMsg: errorMessage,
      }); 
  });
})

servidor.post("/signInWithEmailAndPassword", async (req, res) => {
  try {
    const auth = getAuth(firebaseApp);
    const email = req.body.email;
    const password = req.body.password;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado correctamente:", userCredential.user.uid);
      
      res.status(200).send({
        msg: "Sesion iniciada",
        data: userCredential,
      });
    } catch (authError) {
      // Si hay un error en la autenticación, lo manejamos aquí
      console.error("Error de autenticación:", authError);

      // Retornamos un mensaje de error al cliente
      res.status(401).send({
        msg: "Credenciales incorrectas",
        errorCode: authError.code,
        errorMsg: authError.message,
      });
    }
  } catch (error) {
    // Manejamos otros errores que puedan ocurrir en la ruta
    console.error("Error al procesar la solicitud:", error);

    // Retornamos un mensaje de error interno al cliente
    res.status(500).send({
      msg: "Error interno del servidor",
      error: error.toString(),
    });
  }
});

servidor.post("/signOut",  (res) => {
  const auth = getAuth(firebaseApp);
  signOut(auth).then(() => {
    console.log('Se cerro bien la sesion');
  }).catch((error) => {
    console.log('Hubo un error');
  });
});

servidor.get('/listClientes', async (req, res)=>{
  try {
      const client = new MongoClient(uri);
      const mainDB = client.db("test");
      const Post = mainDB.collection("clientes");
      const query = {};
      const options = {
          sort: {},
      };
      const cursor = Post.find(query, options);
      if ((await Post.countDocuments(query)) === 0) {
          res.status(500).send("No se encontraron Clientes")
      }else{
          let arr = []
          for await (const doc of cursor) {
              console.dir(doc);
              arr.push(doc)
          }
          res.status(200).send({
              documentos: arr,
          });
      }
      
  } catch(error){
      res.status(500).send("Algo salio mal")
      console.log(error);
  }finally {
      await client.close();
  } 
  run().catch(console.dir);
})

servidor.put('/editCliente', async (req, res)=>{
  try {
      const client = new MongoClient(uri);
      const mainDB = client.db("test");
      const Post = mainDB.collection("clientes");
      const filter = {correo: req.body.correo};
      const options = { upsert: false };
      const updateDoc = {
          $set: {
          favorito: req.body.favorito,
        },
      };
      const result = await Post.updateOne(filter, updateDoc, options);
      console.log(
          `${result.matchedCount} documento cumplio con las caracteristicas establecidas, se actualizaron ${result.modifiedCount} documento(s)`,
       );
      res.status(200).send("El post se actualizo correctamente");
      //res.status(200).send(`${result.matchedCount} documento cumplio con las caracteristicas establecidas, se actualizaron ${result.modifiedCount} documento(s)`);
  }catch(error){
      res.status(500).send("Algo salio mal, no se pudo actualizar el cliente")
      console.log(error);
  }finally {
      await client.close();
  } 
  run().catch(console.dir);
})

servidor.post('/createCliente', async (req, res)=>{
  try {
      const client = new MongoClient(uri);
      const mainDB = client.db("test");
      const Post = mainDB.collection("clientes");
      const doc = req.body;
      const result = await Post.insertOne(doc);
      console.log(
          `Se inserto un documento con el _id: ${result.insertedId}`,
      );
      res.status(200).send("El Cliente se creo exitosamente")
  } catch(error){
      res.status(500).send("No se creo el Cliente, algo salio mal")
  }finally {
      await client.close();
  }
})

servidor.get('/getAirbnb', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    const mainDB = client.db("test");
    const Post = mainDB.collection("airbnb");
    const query = {};
    const options = {
      projection: { _id: 0, pais: 1, ciudad: 1, calle: 1, numero: 1, currentOwner: 1,tipo: 1,imagen: 1},
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
