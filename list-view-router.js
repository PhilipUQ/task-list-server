
const express = require('express');

const router = express.Router();

const fs = require('fs');

const { middValidarParams } = require('./middleware');



router.use(middValidarParams);


// funcion para cargar tareas desde el archivo listaDeTareas.json

const cargarArray = () => {

    console.log("cargando array de tareas desde list-view-router");

    return JSON.parse(fs.readFileSync('./listaDeTareas.json', 'utf8'));
    
};



// se filtran las tareas por estado

let filtroTareasPorEstado = (estado) => {

    let arrayTareasActuales = cargarArray(); // se cargan las tareas cada vez que se llama la funcion

    return arrayTareasActuales.filter(tarea => tarea.isCompleted ===  estado);


};




// Ruta para tareas completas

router.get('/completas', (req, res) => {

  
    let tareasCompletas = filtroTareasPorEstado(true); // se obtienen la tareas con isComplete: true obtener las tareas completas
    
    res.json(tareasCompletas);


});




// Ruta para tareas incompletas

router.get('/incompletas', (req, res) => {

  
    let tareasIncompletas = filtroTareasPorEstado(false);  // se obtienen la tareas con isComplete: false obtener las tareas incompletas
    
    res.json(tareasIncompletas);


});



module.exports = router;



