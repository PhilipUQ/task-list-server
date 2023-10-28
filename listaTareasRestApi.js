const express = require('express');

const app = express();

const port = 8000

app.use(express.json())







let arrayTareasApi = [ 
    {

    "id": "123456", 
    "isCompleted": false,
    "description": "pasear al perro"

    },

    {

    "id": "34567",
    "isCompleted": true,
    "description": "estudiar mongoDB"

    },

    {

    "id": "75490",
    "isCompleted": true,
    "description": "tomar agua"

    }

] 





// funcion utilitaria para encontrar tarea por id

const encontrarTareaPorId = (id) => {

    console.log("buscando tarea por id");


    for (let tarea of arrayTareasApi)  {

        if (tarea.id === id) {

            return tarea;


        }

    }


    return null;

}






// agregar tareas

app.post('/tareas', (req, res) => {

    console.log("agregando tarea")

    try {

        let nuevaTarea = req.body;

        arrayTareasApi.push(nuevaTarea);

        res.status(201).json({ msg: "tarea creada con exito", data: nuevaTarea });


    } catch (err) {

        console.log("algo salio mal ", err);

        res.status(500).json({ msg: "error al agregar tarea" });

    }


});



// listar todas la tareas 

app.get('/tareas', (req, res) => {

    console.log("listando todas las tareas")

    try {

        res.status(200).json({ msg: "exitoso", data: arrayTareasApi });


    } catch (err) {

        console.log("algo salio mal ", err);

        res.status(500).json({ msg: "erro al hacer el listado" });

    }


});







// filtrar tareas completas 

app.get('/tareas/completas', (req, res) => {

    console.log("filtrando tareas completas")


    try {

        let tareasCompletas = arrayTareasApi.filter(tarea => tarea.isCompleted);

        res.status(200).json({ msg: "exitoso", data: tareasCompletas });


    } catch (err) {


        console.log("algo salio mal", err);

        res.status(500).json({ msg: "error al filtrar tareas completas" });

    }

});



// filtrar tareas incompletas 

app.get('/tareas/incompletas', (req, res) => {

    console.log("filtrando tareas incompletas")


    try {

        let tareasIncompletas = arrayTareasApi.filter(tarea => !tarea.isCompleted);

        res.status(200).json({ msg: "exitoso", data: tareasIncompletas });


    } catch (err) {

        console.log("algo salio mal", err);

        res.status(500).json({ msg: "error al filtrar tareas incompletas" });

    }

});




// filtrar una sola tarea

app.get('/tareas/:id', (req, res) => {

    try {

        let tareaId = req.params.id;

        let tarea = encontrarTareaPorId(tareaId);
        
        
        if (tarea) {

            res.status(200).json({ msg: "exitoso", data: tarea });

        } else {

            res.status(404).json({ msg: "tarea no encontrada" });


        }


    } catch (err) {

        console.log("algo salio mal", err);

        res.status(500).json({ msg: "error al obtener una tarea" });

    }


});




// actualizar tareas

app.put('/tareas/:id', (req, res) => {

    console.log("se actualizara una tarea");

    try {

        let tareaId = req.params.id;

        let tareaActualizada = null;

        arrayTareasApi.map(tarea => {


            if (tarea.id === tareaId) {

                Object.assign(tarea, req.body);

                tareaActualizada = tarea;
            }


        });


        if (tareaActualizada) {
            
            res.status(200).json({ msg: "tarea actualizada con exito", data: tareaActualizada });

        } else {

            res.status(404).json({ msg: "tarea ni encontrada" });

        }

    } catch (err) {

        console.log("algo salio mal", err);

        res.status(500).json({ msg: "error al actualizar la tarea"});

    }


});




// eliminar tareas

app.delete('/tareas/:id', (req, res) => {

    console.log("se eliminara una tarea" )

    try {

        let tareaId = req.params.id;

        let indexTarea = arrayTareasApi.findIndex(tarea => tarea.id === tareaId);

        if (indexTarea > -1) {

            arrayTareasApi.splice(indexTarea, 1);

            res.status(200).json({ msg: "eliminado con exito" });

        } else {

            res.status(404).json({ msg: "tarea no encontrada" });

        }
    } catch (err) {

        console.log("algo salio mal", err);

        res.status(500).json({ msg: "error al intentar actualizar la tarea" });

    }


});










app.listen(port, () => {

    console.log(`servidor correindo ${port}`); 
  
  });



  