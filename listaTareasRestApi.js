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


// middleware para encontrar una tarea por su id a traves de un bucle for, esto ayudara que sea mas optimo el REST API evitara que tenga que hacer varias iteraciones y saturar el servidor

const middEncontrarTarea = (req, res, next) => {

    console.log("buscando id de tarea desde middleware");

    let tareaId = req.params.id;

    let tarea = null;

  
    for (let t of arrayTareasApi) {
    

        if (t.id === tareaId) {

            tarea = t;

            break;

        }

    }

    if (tarea) {

        req.tareaEncontrada = tarea;

        next();

    } else {

        res.status(404).json({ msg: "Tarea no encontrada" });

    }

  };





  // middleware para filtrar tareas completas e incompletas ya que cada endpoint debe estar separado

  const middFiltrarTareas = (completadas) => (req, res, next) => {
    

    console.log(`filtrando tareas ${completadas ? 'completadas' : 'incompletas' }`);

    req.tareasFiltradas = arrayTareasApi.filter(tarea => tarea.isCompleted === completadas);

    next();


  };
  



  
  // metodo POST agregar una tarea

  app.post('/tareas', (req, res) => {


    console.log("Agregando tarea");

    try {

        const nuevaTarea = req.body;

        arrayTareasApi.push(nuevaTarea);

        res.status(201).json({ message: "nueva tarea creada", data: nuevaTarea });


    } catch (error) {

        console.log("algo salio mal ", error);

        res.status(500).json({ msg: "error al agregar tarea" });

    }


  });



  
  // metodo GET para mostrar todo el array de tareas

  app.get('/tareas', (req, res) => {

    console.log("listadoando todas las tareas");

    res.status(200).json({ msg: "exitoso", data: arrayTareasApi });

  });
  


  
  // metodo GET para filtrar solo las tareas completas 

  app.get('/tareas/completas', middFiltrarTareas(true), (req, res) => { 

    res.status(200).json({ msg: "exitoso", data: req.tareasFiltradas });

  });



  
  // metodo GET para filtrar solo las tareas incompletas 

  app.get('/tareas/incompletas', middFiltrarTareas(false), (req, res) => {

    res.status(200).json({ msg: "exitoso", data: req.tareasFiltradas });

  });
  




  // metodo GET para filtrar solo una tarea especifica

  app.get('/tareas/:id', middEncontrarTarea, (req, res) => {

    res.status(200).json({ msg: "exitoso", data: req.tareaEncontrada });

  });
  


  // metodo PUT para actualizar uan tarea existente

  app.put('/tareas/:id', middEncontrarTarea, (req, res) => {

    Object.assign(req.tareaEncontrada, req.body);

    res.status(200).json({ msg: "tarea actualizada con exito", data: req.tareaEncontrada });

  });


  
  // metodo DELETE para borrar uan tarea existente

  app.delete('/tareas/:id', middEncontrarTarea, (req, res) => {

    const indexTarea = arrayTareasApi.indexOf(req.tareaEncontrada);

    arrayTareasApi.splice(indexTarea,  1);

    res.status(200).json({ msg: "eliminado con exito" });


  });





app.listen(port, () => {

    console.log(`servidor correindo ${port}`); 
  
  });



  