
const express = require('express');

const router = express.Router();

const fs = require('fs');



// funcion para cargar tareas desde el archivo listaDeTareas.json
const cargarArray = () => {

    console.log("cargando array desde list-edit-router.js");

    return JSON.parse(fs.readFileSync('./listaDeTareas.json', 'utf8'));

};



  // función para guardar tareas en el archivo listaDeTareas.json
const guardarEnArray = (tareas) => {

    console.log("guardando tarea en array" );

    fs.writeFileSync('./listaDeTareas.json', JSON.stringify(tareas));


};




// raiz de la ruta editar

router.get('/', (req, res) => {

    res.status(200).send("bienvenido a editar");

});




// ruta para crear una nueva tarea

router.post('/', (req, res) =>  {

    console.log("se creara una nueva tarea");


    try {

        const nuevaTarea = req.body;

        let arrayTareasActuales = cargarArray(); // se cargan las tareas

        arrayTareasActuales.push(nuevaTarea);

        guardarEnArray(arrayTareasActuales); // se guarda el array actualizado

        console.log("array actualizado");
        

        console.log("se agrego la nueva tarea");

        res.status(200).json({ accion: "tarea agregada", tarea: nuevaTarea });



    } catch (error) {


        console.log("algo salio mal", error);
    
        res.status(500).send("hubo un porblema al agregar la tarea");

    
    }



});





// ruta para borrar una tarea

router.delete('/:id',  (req, res) => {

    let arrayTareasActuales = cargarArray();

    console.log("se eliminara una tarea");


    try {

        let arrayTareasActuales = cargarArray();

        const tareaId = req.params.id;

        const indiceTareas = arrayTareasActuales.map(tarea => tarea.id).indexOf(tareaId); // Usamos map para identificar el indice de la tarea que eliminaremos



        if (indiceTareas > -1) {

            arrayTareasActuales.splice(indiceTareas, 1 );

            guardarEnArray(arrayTareasActuales); // se guarda el array actualizado

            console.log("array actualizado");

            res.status(200).send("tarea eliminada");

        } else {

            res.status(404).send("tarea no encontrada");
        }



    } catch {

        console.log("algo salio mal", error);
    
        res.status(500).send("hubo un porblema al eliminar la tarea");


    }


});




// ruta para atualizar una tarea

router.put('/:id', (req, res) => {


    console.log("se actualizara una tarea");


    try {

        let arrayTareasActuales = cargarArray();

        const tareaId = req.params.id;

        const actualizarParams = req.body;
    
        
        const indiceTareas = arrayTareasActuales.map(tarea => tarea.id).indexOf(tareaId); // Usamos map para identificar el indice de la tarea que actualizaremos


    
        if (indiceTareas > -1)  {
    
            
            arrayTareasActuales[indiceTareas] = { ...arrayTareasActuales[indiceTareas], ...actualizarParams  }; // se actualiza la tarea

            guardarEnArray(arrayTareasActuales); // se guarda el array actualizado

            console.log("array actualizado");

    
            res.status(200).json({ accion: "tarea actualizada ", tarea: arrayTareasActuales[indiceTareas] });
    
    
        } else {
    
            res.status(404).send("tarea no encontrada");

    
        }


    } catch {

        console.log("algo salio mal", error);
    
        res.status(500).send("hubo un porblema al eliminar la tarea");

    }

   

});







module.exports = router;







