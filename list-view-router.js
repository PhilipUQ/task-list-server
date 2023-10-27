
const express = require('express');

const router = express.Router();

let arrayListaTareas = require('./listaDeTareas.json');




//filtro de tareas "completas" e "incompletas"
router.get('/:estado', (req, res) => {

    const estadoTareas = req.params.estado; 

    console.log("filtrando tareas");
    
    const tareasFiltradas = arrayListaTareas.filter(tareas => {

        return estadoTareas === "completas" ? tareas.isCompleted : !tareas.isCompleted; // al usar el string "completas" en parametro nos filtra las tareas completas, de lo contrario las incompletas

    });

    res.json(tareasFiltradas);

    console.log("visualizando tareas filtradas");

});



module.exports = router;

// mas adelante se implementara una validacion para solo escribir "completas" o "incompletas" en el parametro 




