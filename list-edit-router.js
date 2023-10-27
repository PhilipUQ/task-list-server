
const express = require('express');

const router = express.Router();

let arrayTareas = require('./listaDeTareas.json');



// raiz de la ruta editar
router.get('/', (req, res) => {

    res.status(200).send("bienvenido a editar")

});




// ruta crear una nueva tarea
router.post('/', (req, res) =>  {

    console.log("se creara una nueva tarea")

    try {

        const nuevaTarea = req.body;

        arrayTareas.push(nuevaTarea);

        console.log("se agrego la nueva tarea");

        res.status(200).send( nuevaTarea );


    } catch (error) {

        console.log("algo salio mal", error);
    
        res.status(500).send("hubo un porblema al agregar la tarea");
    
      }

});



// ruta borrar una tarea
router.delete('/:id',  (req, res) => {

    console.log("se eliminara una tarea");

    try {

        const tareaId = req.params.id;

    
        const tareaIndex = arrayTareas.map(tarea => tarea.id).indexOf(tareaId); // Usamos map para identificar el indice de la tarea que eliminaremos

        if (tareaIndex > -1) {

            arrayTareas.splice(tareaIndex, 1 );

            res.status(200).send("tarea eliminada");

        } else {

            res.status(404).send("tarea no encontrada");
        }


    } catch {

        console.log("algo salio mal", error);
    
        res.status(500).send("hubo un porblema al eliminar la tarea");

    }

});



// ruta atualizar una tarea
router.put('/:id', (req, res) => {

    console.log("se actualizara una tarea");

    try {

        const tareaId = req.params.id;

        const actualizarDatos = req.body;
    
        
        const tareaIndex = arrayTareas.map(tarea => tarea.id).indexOf(tareaId); // Usamos map para identificar el indice de la tarea que actualizaremos

    
        if (tareaIndex > -1)  {
    
            
            arrayTareas[tareaIndex] = { ...arrayTareas[tareaIndex], ...actualizarDatos  }; // se actualiza la tarea
    
            res.status(200).send("tarea actualizada");
    
    
        } else {
    
            res.status(404).send("tarea no encontrada");
    
        }

    } catch {

        console.log("algo salio mal", error);
    
        res.status(500).send("hubo un porblema al eliminar la tarea");

    }

   
});





module.exports = router;







