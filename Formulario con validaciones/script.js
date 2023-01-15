//Onsubmit con mi funcion que inicializa la logica en el HTML
document.getElementById("formulario").onsubmit = function functionEmpezar() {
  //Limpiar el div donde va el resultado, para que no concatene al darle mas de 1 vez a enviar sin recargar el navegador
  document.getElementById("resultado").innerHTML = "";
  recogerValues();
  return false;
}

//--------------------------------------------------------------------------------//
//Funcion unica del programa que por medio de arrays recojo los values de los-----// 
//names de los radio buttons y voy buscando a traves de bucles las posiciones de--//
//los values. Coloreo de rojo las preguntas no respondidas y si se marcan todas,--//
//devuelvo aciertos y el valor de cada radio marcado------------------------------//
//--------------------------------------------------------------------------------//
function recogerValues() {
  //Array de respuestas correctas.
  let respuestasCorrectas = ["Danny y Sandy", "Quentin Tarantino", "Lo que el viento se llevó", "Dos", "Tapón", "Ninguno", "Primos", "21", "Blue Jasmine", "8"];
  //Array para almacenar los radio buttons que marco.
  let miRespuesta = [];
  //Array para recorrer los values, recoger el valor de los names
  let valoresNames = [];
  //Array donde guardo si la respuesta es OK o error
  let imagenesRadio = [];
  //Variables para identificar si acierto o fallo (debe de llevar el mismo nombre de la imgen para imprimirla luego)
  let tickVerde = "img/verde.svg";
  let tickRojo = "img/rojo.svg";
  //Variables inicializadas a 0. Se utilizan para contar cuantas preguntas marco y cuantas preguntas acierto
  let contadorPreguntas = 0;
  let contadorAciertos = 0;
  for (let i = 0; i < 10; i++) {
    //Varibale de control para mirar los radios que dejo sin marcar (== null)
    let auxiliar = false;
    valoresNames = document.getElementsByName(i + 1);
    for (let j = 0; j <= 2; j++) {
      if (valoresNames[j].checked == true) {
        //Si la variable de control ahora es true, y los radio estan marcados, meto su valor en el array miRespuesta
        //y los comparo con el array de respuestas correctas
        auxiliar = true;
        contadorPreguntas++;
        miRespuesta[i] = valoresNames[j].value;

        if (valoresNames[j].value == respuestasCorrectas[i]) {
          //Por aqui entrara si acierto cada pregunta
          imagenesRadio[i] = tickVerde;
          contadorAciertos++;
        } else {
          imagenesRadio[i] = tickRojo;
        }
        //Listar en el div los resultados. 
        document.getElementById("resultado").innerHTML += (i + 1) + ". Respuesta correcta: " + respuestasCorrectas[i] +
          ". Tú respuesta: " + miRespuesta[i] + "<br>";
        document.getElementById('im' + (i + 1)).innerHTML += " <img src='" + imagenesRadio[i] + "' width=30 height=30><br>";
        document.getElementById("aciertos").innerHTML = "<h4>Aciertos: " + contadorAciertos + "/10</h4>";
      }
    }
    //Negar la variable de control para comprobar si mi respuesta a entrado con algun radio sin marcar (contadorPreguntas < 10)
    if (!auxiliar) {
      //cambiar el contenido del array ya que no respondo a todas las preguntas. (no se iguala a valoresNames[j].value)
      miRespuesta[i] = "No Respondido";
      document.getElementById("resultado").innerHTML += "No has respondido a la pregunta --> " + (i + 1) + "<br>";
      document.getElementById('p' + (i + 1)).style.color = '#FF0000';
    }

  }
  //Comprobar si no marco las 10 preguntas.
  if (contadorPreguntas != 10) {
    document.getElementById("resultado").innerHTML = "<h4>No has respondido a todas las preguntas.</h4>";
  }
}
