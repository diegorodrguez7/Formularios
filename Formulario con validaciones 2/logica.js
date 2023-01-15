/////////////////////////////
// VALIDAR EDAD.
/////////////////////////////
function validarEdad() {
    if (isNaN(document.getElementById("edad").value) || document.getElementById("edad").value < 0 || document.getElementById("edad").value > 105) {
        document.getElementById("errores").innerHTML = "La edad tiene que estar entre 0 y 105 años";
        // Situamos el foco en el campo provincia y le asignamos el mensaje error en el campo propio.
        document.getElementById("telefono").className = "Error";
        document.getElementById("telefono").focus();
        return false;
    }
    // document.getElementById("resultado").innerHTML = "Tu edad es: " + document.getElementById("edad").value;
    return true;
}

/////////////////////////////
// VALIDAR TELEFONO.
/////////////////////////////
function validarTelefono() {
    var patron = /^[69]\d{8}$/;
    if (!patron.test(document.getElementById("telefono").value)) {
        document.getElementById("errores").innerHTML += "Los teléfonos solo pueden empezar por 6 o 9";
        // Situamos el foco en el campo provincia y le asignamos el mensaje error en el campo propio.
        document.getElementById("telefono").className = "Error";
        document.getElementById("telefono").focus();
        return false;
    }
    // document.getElementById("resultado").innerHTML = "Tu telefono es: " + document.getElementById("telefono").value;
    return true;
}

/////////////////////////////
// VALIDAR EMAIL.
/////////////////////////////
function validarEmail() {
    var patron = /^[\w-\.]{2,}@([\w-]{2,}\.)+([\w-]{2,4})$/;
    if (!patron.test(document.getElementById("email").value)) {
        document.getElementById("errores").innerHTML += "El formato del email introducido no es válido.";
        // Situamos el foco en el campo provincia y le asignamos el mensaje error en el campo propio.
        document.getElementById("email").focus();
        document.getElementById("email").className = "Error";
        return false;
    }
    return true;
}

/////////////////////////////
// VALIDAR DNI.
/////////////////////////////
function validarNif() {
    var patron = /^\d{8}-[A-Z]$/;
    if (!patron.test(document.getElementById("nif").value)) {
        document.getElementById("errores").innerHTML = "El número del NIF introducido no es válido.";
        // Situamos el foco en el campo provincia y le asignamos el mensaje error en el campo propio.
        document.getElementById("nif").focus();
        document.getElementById("nif").className = "error";
        return false;
    }
    // document.getElementById("resultado").innerHTML = "Tu dni es: " + document.getElementById("nif").value;
    return true;
}

/////////////////////////////
// VALIDAR PROVINCIA.
/////////////////////////////
function validarProvincia() {
    if (document.getElementById("provincia").selectedIndex == 0) {
        document.getElementById("errores").innerHTML = "No has seleccionado ninguna provincia.";
        // Situamos el foco en el campo provincia y le asignamos el mensaje error en el campo propio.
        document.getElementById("provincia").focus();
        document.getElementById("provincia").className = "error";
        return false;
    }
    // document.getElementById("resultado").innerHTML = "Tu provincia elegida es: " + document.getElementById("provincia").value;
    return true;
}

/////////////////////////////
// VALIDAR FECHA.
/////////////////////////////
function validarFecha() {
    var patron = /^((0?[1-9])|(1\d)|(2\d)|(3[0-1]))[-|\/]((0?[1-9])|(1[0-2]))[-|\/]([1-2]\d{3})$/
    if (!patron.test(document.getElementById("fecha").value)) {
        document.getElementById("errores").innerHTML = "El formato de la fecha introducida no es valida (dd/mm/aaaa)";
        // Situamos el foco en el campo provincia y le asignamos el mensaje error en el campo propio.
        document.getElementById("fecha").focus();
        document.getElementById("fecha").className = "error";
        return false;
    }
    // document.getElementById("resultado").innerHTML = "La fecha introducida es: " + document.getElementById("fecha").value;
    return true;
}

/////////////////////////////
// VALIDAR HORA.
/////////////////////////////
function validarHora() {
    var patron = /^(0?[1-9]|1\d|2[0-3]):([0-5]?\d)$/;
    if (!patron.test(document.getElementById("hora").value)) {
        document.getElementById("errores").innerHTML = "El formato de la hora introducida no es valida (hh:mm)";
        document.getElementById("hora").focus();
        document.getElementById("hora").className = "error";
        return false;
    }
    // document.getElementById("resultado").innerHTML = "La hora introducida es: " + document.getElementById("hora").value;
    return true;
}

/////////////////////////////
// CREAR, LEER Y BORRAR COOKIE.
/////////////////////////////
function crearCookie(nombre, valor, dias) {
    if (dias) {
        var date = new Date();
        date.setTime(date.getTime() + (dias * 24 * 60 * 60 * 1000));
        var expirar = "; expires=" + date.toGMTString();
    } else {
        var expirar = "";
    }
    document.cookie = nombre + "=" + valor + expirar + "; path=/";
}
function leerCookie(nombre) {
    var miNombre = nombre + "=";
    var cadena = document.cookie.split(';');
    for (var i = 0; i < cadena.length; i++) {
        var c = cadena[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(miNombre) == 0)
            return c.substring(miNombre.length, c.length);
    }
    return 0;
}
function borrarCookie(nombre) {
    crearCookie(nombre, "", -1);
}

/////////////////////////////
// INICIAR JAVASCRIPT.
/////////////////////////////
window.onload = iniciar;
function iniciar() {
    //Reniciar la coockie a 0.
    borrarCookie("visita");
    document.getElementById("enviar").addEventListener('click', validar, false);
    //Cada vez que los campos NOMBRE y APELLIDOS pierdan el foco, el contenido que se haya escrito en esos campos se convertirá a mayúsculas.
    document.getElementById("nombre").addEventListener('blur', convertirMayusculas, false);
    document.getElementById("apellidos").addEventListener('blur', convertirMayusculas, false);
}

/////////////////////////////
// CONVERTIR A MAYUS NOMBRE Y APELLIDOS.
/////////////////////////////
function convertirMayusculas() {
    document.getElementById("nombre").value = document.getElementById("nombre").value.toUpperCase();
    document.getElementById("apellidos").value = document.getElementById("apellidos").value.toUpperCase();
}

/////////////////////////////
// CONTADOR DE ERRORES.
/////////////////////////////
function validar(e) {
    var valor = parseInt(leerCookie("visita")) + 1;
    crearCookie("visita", valor, 30);
    document.getElementById("intentos").innerHTML = "INTENTOS: " + valor;
    if (validarcampostexto(this) && validarEdad() && validarNif() && validarEmail() && validarProvincia() && validarFecha() && validarTelefono() && validarHora() && window.confirm("¿Deseas enviar el formulario?")) {
        listarDatos();
    } else {
        e.preventDefault();
    }
}

/////////////////////////////
// VALIDAR CAMPOS TEXTO.
/////////////////////////////
function validarcampostexto(objeto) {
    var formulario = objeto.form;
    for (var i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = "";
        if (formulario.elements[i].type == "text" && formulario.elements[i].value == "") {
            formulario.elements[i].className = "error";
            formulario.elements[i].focus();
            document.getElementById("errores").innerHTML = "El campo: " + formulario.elements[i].id + " no puede estar vacío";
            return false;
        }
    }
    return true;
}


// // function listarDatos(e) {
// //     document.querySelectorAll('form').addEventListener('submit', e => {
// //         e.preventDefault()
// //         const data = Object.fromEntries(
// //             new FormData(e.target)
// //         )
// //         document.getElementById("resultado").innerHTML = data;
// //     })
// // }

function listarDatos() {
    document.getElementById("resultado").innerHTML += "Tu nombre es: " + document.getElementById("nombre").value + "<br>";
    document.getElementById("resultado").innerHTML += "Tu apellidos es: " + document.getElementById("apellidos").value + "<br>";
    document.getElementById("resultado").innerHTML += "Tu edad es: " + document.getElementById("edad").value + "<br>";
    document.getElementById("resultado").innerHTML += "La hora introducida es: " + document.getElementById("hora").value + "<br>";
    document.getElementById("resultado").innerHTML += "Tu telefono es: " + document.getElementById("telefono").value + "<br>";
    document.getElementById("resultado").innerHTML += "Tu email es: " + document.getElementById("email").value + "<br>";
    document.getElementById("resultado").innerHTML += "Tu dni es: " + document.getElementById("nif").value + "<br>"; 
    document.getElementById("resultado").innerHTML += "Tu provincia elegida es: " + document.getElementById("provincia").value + "<br>";
    document.getElementById("resultado").innerHTML += "La fecha introducida es: " + document.getElementById("fecha").value + "<br>";
    document.getElementById("resultado").innerHTML += "La hora introducida es: " + document.getElementById("hora").value + "<br>";
}


/////////////////////////////
// EXPONER/listar VALORES.
/////////////////////////////
// function leerFormulario() {
//     let frmDatosPersonales = document.getElementById("form");
//     let resultado = "";
//     console.log(resultado);
//     for (let index = 0; index < frmDatosPersonales.length; index++) {
//         if(frmDatosPersonales.elements[i].value != "Enviar"){
//             resultado += frmDatosPersonales.elements[i].value;
//         }
//         console.log(resultado);
//     }
//     console.log(resultado);
//     document.getElementById("resultado").textContent = resultado;
//     console.log(resultado);
// }