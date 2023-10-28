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

