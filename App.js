
const express = require('express');

const fs = require('fs');

const listEditRouter = require('./list-edit-router');

const listViewRouter = require('./list-view-router');



const app = express();



app.use(express.json()); 



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





//direccionador filtrar tareas

app.use('/filtro', listViewRouter);


//direccionador editar tareas

app.use('/editar', listEditRouter);






app.listen(3000, () => {

  console.log("servidor correindo"); 

});


