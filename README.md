metodo de uso

se corre el servidor usando npm run start, donde correra con nodemon

la ruta POST /login al ingresar el usuario y la contraseña devolverá una token el cual se usara para entrar a la rutaProtegida:

    {
    "user":"user321",
    "password":"pass321"
    }


-----------------------------------------------------------------------

una vez tengamos el token, debemos cambiar a la ruta GET /rutaProtegida, abriremos la pestaña Header y activaremos (Authorization).

En frente de Authorization ingresaremos el token, el cual, si es valido, nos dará acceso a la /rutaProtegida

-------------------------- agregar tarea ------------------------------

para gregar uan tarea: POST localHost:3000/editar --> se tendran que seguir estos pasos:


en postman al seleccionar el metodo POST y colocamos la ruta (/editar)

despues, vamos a la pestaña body, seleccionamos raw y seleccionamos JSON como el formato del body 

antes mandar la ruta en el body agregamos la nueva tarea como un JSON

    {
        "id": "123456",
        "isCompleted": false,
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
        "isCompleted": true,
        "description": "jugar ping pong, mañana mejor" 
    }


---------------------------------------------------------------------