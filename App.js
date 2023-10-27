
const express = require('express');

let arrayTareas = require('./listaDeTareas.json');

const app = express();


// raiz
app.get('/', (req, res) => {

  res.status(200).send(arrayTareas)

});



app.listen(3000, () => {

  console.log("servidor correindo"); 

});