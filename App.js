
require ('dotenv').config();

const express = require('express');

const fs = require('fs');

const listEditRouter = require('./list-edit-router');

const listViewRouter = require('./list-view-router');

const { validarMetodoHttp } = require('./middleware');

const jwt = require('jsonwebtoken');

const LLAVE_SECRETA = process.env.LLAVE_SECRETA;




const app = express();



const PORT = process.env.PORT


app.use(express.json()); 

app.use(validarMetodoHttp);



// funcion para cargar tareas desde el archivo listaDeTareas.json

const cargarArray = () => {

  console.log("cargando array desde App.js");

  return JSON.parse(fs.readFileSync('./listaDeTareas.json', 'utf8'));


};




//raiz
app.get('/', (req, res) => {

  let arrayTareasActuales = cargarArray();

  res.status(200).send( arrayTareasActuales )

});







//base de datos usuarios 

const baseDeDatosUsuario ={

  userName:"user321",
  password:"pass321",
  rol: "manager"


}



//middleware de autenticacion

function middAutenticacion (req, res, next) {

  const token = req.headers.authorization;

  if(!token) {

    res.status(401).send("debes ingresar un token")

  }

  try {

    const tokenDesencriptado = jwt.verify(token, LLAVE_SECRETA)

    req.data = tokenDesencriptado;

    next();

    
  } catch (error) {

    res.status(401).send("no autorizado: el token debe ser valido")
    
  }


}



//ruta POST login

app.post('/login', (req, res) => {

  const usuario = req.body.user

  const contrasena = req.body.password


  if(usuario === baseDeDatosUsuario.userName && contrasena === baseDeDatosUsuario.password) {

    const payload = {

      rol: baseDeDatosUsuario.rol

    }

    const token = jwt.sign(payload, LLAVE_SECRETA);

    res.status(200).send({msg: "bienvenido", token });



  } else {

    res.status(401).send("contracela o usuario incorrecto")



  }



});



app.get('/rutaProtegida', middAutenticacion, (req, res) => {

  res.status(200).send("esta es una lista de contabilidad")



});






//direccionador filtrar tareas

app.use('/filtro', listViewRouter);


//direccionador editar tareas

app.use('/editar', listEditRouter);








app.listen(PORT, () => {

  console.log(`servidor correindo ${PORT}`); 

});


