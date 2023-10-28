metodo de uso

REST API lista de tareas

se corre el servidor usando (npm run startAPI), donde correra con nodemon

GET/tarea -- se muestra el listado completo del array

POST/tarea -- se agrega una nueva tarea (se le dan los parametros en el body)

GET/tarea/:id -- se filtra la tarea con el id que se le requirio

GET/tarea/completa -- se filtran las tareas completas

GET/tarea/incompleta -- se filtran las tareas incompletas

DELETE/tareas/:id -- se elimina la tarea del id que se le requirio

PUT/tareas/:id -- se modifica la tarea del id que se requiro (se le pasan los parametros en el body)

-----------------------------------------------------------------------------------------


Autenticacion JWT


se corre el servidor usando (npm run startJWT), donde correra con nodemon

la ruta POST /login al ingresar el usuario y la contraseña devolverá una token el cual se usara para entrar a la rutaProtegida:

    {
    "user":"user321",
    "password":"pass321"
    }

una vez tengamos el token, debemos cambiar a la ruta GET /rutaProtegida, abriremos la pestaña Header y activaremos (Authorization).

En frente de Authorization ingresaremos el token, el cual, si es valido, nos dará acceso a la /rutaProtegida



