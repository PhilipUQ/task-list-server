const express = require('express');

let arraTareas = require('./listaDeTareas.json');

const listEditRouter = require('./list-edit-router');

const listViewRouter = require('./list-view-router');

const app = express();



app.use(express.json());



//raiz
app.get('/', (req, res) => {

  res.status(200).send(arraTareas)

});


//direccionador filtrar tareas
app.use('/filtro', listViewRouter);


//direccionador editar tareas
app.use('/editar', listEditRouter);




app.listen(3000, () => {

  console.log("servidor correindo"); 

});

