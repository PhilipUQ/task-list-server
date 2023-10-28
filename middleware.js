
// se trabaja usando funciones separadas ya que los middlewares de POST y PUT usan la misma logica, ademas, asi se podrian reutilizar mas facil en otros middlewares


//funcion para validar si el cuerpo esta vacio

function validarCuerpoVacio(req) {

    return JSON.stringify(req.body) === "{}";

};


//funcion para validar los atributos  

function validarAtributos(body) {

    const { id, description, isCompleted } = body;

  
    if (!id || !description || isCompleted === undefined) {

        return { valido: false, mensaje: "faltan atributos" };


    }
  
    if (typeof id !== "string" || typeof description !== "string" || typeof isCompleted !== "boolean") {

        return { valido: false, mensaje: "atributo no válido" };


    }
  
    return { valido: true };


}







// middleware validar cuerpo vacio de POST

function middCuerpoVacioPost (req, res, next) {

    console.log("validando cuerpo vacio desde POST middleware");


    if (validarCuerpoVacio(req)) {

        return res.status(400).send("cuerpo de la solicitud esta vacio");
      }
    

    next();

};



 
// middleware validar atributos de POST

function middAtributosPost(req, res, next) {


    console.log("validando atributos desde PUT middleware");


    try {

        // se verifica el metodo 

        if (req.method === "POST") {

            const validacion = validarAtributos(req.body);

            if (!validacion.valido) {

            res.status(400).send(validacion.mensaje);

            return;

            }
        }

        next();
        


    } catch (error) {

        
        console.log("error middleware validar atributos en POST", error);

        res.status(500).send("algo salio mal");


    }

      

}    
      
      


// middleware validar cuerpo vacio de PUT

function middCuerpoVacioPut (req, res, next) {

    console.log("validando cuerpo vacio desde PUT middleware");


    if (validarCuerpoVacio(req)) {

        return res.status(400).send("cuerpo de la solicitud esta vacio");
      }
    

      next();

};



 
// middleware validar atributos de PUT

function middAtributosPut(req, res, next) {


    console.log("validando atributos desde PUT middleware");


    try {

        // se verifica el metodo 

        if (req.method === "PUT") {

            const validacion = validarAtributos(req.body);

            if (!validacion.valido) {

            res.status(400).send(validacion.mensaje);

            return;

            }
        }

        next();
        


    } catch (error) {

        
        console.log("error al validar atributos en PUT", error);

        res.status(500).send("algo salio mal");


    }

      

}    



// middleware para validar el metodo

function validarMetodoHttp(req, res, next) {

    console.log("validando HTTP desde validar metodo middleware");
  
    
    const metodosPermitidos = [ "GET", "POST", "PUT", "DELETE"] ; // metodos HTTP permitidos
  
    if (metodosPermitidos.indexOf(req.method) >= 0) {

        next();


    } else {

        res.status(405).send("metodo no permitido");


    }

  }





//funcion validar parametros de list-view-router

function middValidarParams(req, res, next) {


    console.log("validando el parametro ingresado desde middleware list-view-router");
    
  
    // se hace un split de la url para sacar el estado 
    const ruta = req.path.split('/');

    const paramSolicitado = ruta[1];
  
    
    const parametrosValidos = ["completas",  "incompletas"]; // se definen los parametro validos

    
    
    if (parametrosValidos.includes(paramSolicitado)) { // se valida si el parametro es correcto


        next();  

    } else {

        
        res.status(400).send("parametro no valido");


    }
  }
  
  




module.exports = {middCuerpoVacioPost, middAtributosPost, middAtributosPut, middCuerpoVacioPut, validarMetodoHttp, middValidarParams};




