metodo de uso

se corre el servidor usando npm run start, donde correra con nodemon

la ruta raiz (localHost:3000) imprimira el archivo listaDeTareas.json

para FILTAR las tareas se debe usar la ruta (/filtro) seguido de si se requiere las tareas completas (/filtro/completas) o las tareas incompletas (/filtro/incompletas)

para EDITAR tareas se debe usar la ruta (/editar):


-------------------------- agregar tarea ------------------------------

para gregar uan tarea: POST localHost:3000/editar --> se tendran que seguir estos pasos:


en postman al seleccionar el metodo POST y colocamos la ruta (/editar)

despues, vamos a la pestaña body, seleccionamos raw y seleccionamos JSON como el formato del body 

antes mandar la ruta en el body agregamos la nueva tarea como un JSON

    {
        "id": "123456",
        "isComplete": false,
        "description": "jugar ping pong" 
    }

---------------------------------------------------------------------




-------------------------- eliminar tarea ------------------------------

para eliminar una tarea: DELETE localHost:3000/editar/:id --> se eliminara la tarea con el id que se le da como parametro

---------------------------------------------------------------------




-------------------------- actualizar tarea ------------------------------


para actualizar uan tarea: PUT localHost:3000/editar/:id --> se tendran que seguir estos pasos:


en postman al seleccionar el metodo PUT y colocamos la ruta y el id de la tarea que vamos a editar (/editar/:id)

despues, vamos a la pestaña body, seleccionamos raw y seleccionamos JSON como el formato del body 

antes mandar la ruta, en el body modificamos los parametros que queramos actualizar

    {
        "id": "7890",
        "isComplete": true,
        "description": "jugar ping pong, mañana mejor" 
    }


---------------------------------------------------------------------