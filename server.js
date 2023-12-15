/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
const express = require('express');
const path = require('path'); 
const {initializeApp} = require("firebase/app");
const {getAnalytics} = require("firebase/analytics");
const bodyParser = require('body-parser');
const cors = require('cors');
const {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification} = require("firebase/auth");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
var urlEncodeParser = bodyParser.urlencoded({extended:true});

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

servidor.post("/signInWithEmailAndPassword",  (req, res) => {
  try {
    const auth = getAuth(firebaseApp);
    const email = req.body.email;
    const password = req.body.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((resp) => {
          res.status(200).send({
          msg: "Sesion iniciada",
          data: resp,
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.status(500).send({
          msg: "Error al iniciar sesion, credenciales incorrectas", 
          errorCode: errorCode,
          errorMsg: errorMessage,
        });
  });
  } catch (error) {
    const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).send({
        msg: "Error al iniciar sesion, credenciales incorrectas", 
        errorCode: errorCode,
        errorMsg: errorMessage,
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



