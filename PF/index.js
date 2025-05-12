// Variable global para almacenar las encuestas
const encuestas = [];

// Crea una pregunta con texto, opciones y votos inicializados en cero
const crearPregunta = (texto, opciones) =>
  opciones.length !== 2
    ? (console.error("Una pregunta necesita exactamente 2 opciones."), null)
    : [texto, opciones, opciones.map(() => 0)];

// Pide exactamente 2 opciones de respuesta al usuario
const ingresarOpciones = () => {
  const opciones = [];
  for (let i = 0; i < 2; i++) {
    const opcion = prompt(`Ingresa la opción ${i + 1}:`);
    opciones.push(opcion);
  }
  return opciones;
};

// Crea una encuesta pidiendo título y 8 preguntas por defecto
const crearEncuesta = () => {
  const titulo = prompt("Ingrese el título de la encuesta:");
  const preguntasDATA = Array.from({ length: 8 }, (_, i) => {
    const texto = prompt(`Escribe el texto de la pregunta ${i + 1}:`);
    const opciones = ingresarOpciones();
    return crearPregunta(texto, opciones);
  }).filter(Boolean); // Filtra por si alguna pregunta no se creó correctamente

  let agregarMas = confirm("¿Deseas agregar más preguntas?");
  while (agregarMas) {
    const texto = prompt("Escribe el texto de la nueva pregunta:");
    const opciones = ingresarOpciones();
    const pregunta = crearPregunta(texto, opciones);
    if (pregunta) preguntasDATA.push(pregunta);
    agregarMas = confirm("¿Deseas agregar otra pregunta?");
  }

  const encuesta = [titulo, preguntasDATA];
  encuestas.push(encuesta);
  console.log(`Encuesta "${titulo}" creada con éxito.`);
  return encuesta;
};

// Permite votar en una pregunta específica
const votarPregunta = (pregunta) => {
  const [texto, opciones, votos] = pregunta;
  const opcionesTexto = opciones.map((op, i) => `${i + 1}. ${op}`).join("\n");
  const respuesta = parseInt(prompt(`${texto}\n${opcionesTexto}\nElige una opción (1 o 2):`)) - 1;

  if (respuesta === 0 || respuesta === 1) {
    votos[respuesta]++;
  } else {
    alert("Opción inválida. Por favor, elige 1 o 2.");
  }
};

// Permite votar en las preguntas de una encuesta
const votarEnEncuesta = (encuesta) => {
  const [titulo, preguntas] = encuesta;
  alert(`Comienza la votación para la encuesta: ${titulo}`);

  let seguirVotando = true;
  while (seguirVotando) {
    const listadoPreguntas = preguntas.map(([texto], i) => `${i + 1}. ${texto}`).join("\n");
    const preguntaIndex = parseInt(prompt(`¿Sobre qué pregunta deseas votar?\n${listadoPreguntas}\n\nIngresa el número de la pregunta:`)) - 1;

    if (preguntaIndex >= 0 && preguntaIndex < preguntas.length) {
      votarPregunta(preguntas[preguntaIndex]);
    } else {
      alert("Número de pregunta inválido.");
    }
    seguirVotando = confirm("¿Deseas votar en otra pregunta?");
  }
};

// Muestra los resultados de una encuesta
const mostrarResultados = (encuesta) => {
  const [titulo, preguntas] = encuesta;
  console.log(`Resultados para la encuesta: "${titulo}"`);
  preguntas.forEach(([texto, opciones, votos], index) => {
    console.log(`\n${index + 1}. ${texto}`);
    opciones.forEach((op, i) => {
      console.log(`- ${op}: ${votos[i]} voto(s)`);
    });
  });
};

// Función principal para iniciar el sistema de encuestas
const iniciarSistemaEncuestas = () => {
  let continuar = true;
  while (continuar) {
    const encuesta = crearEncuesta();
    votarEnEncuesta(encuesta);
    mostrarResultados(encuesta);
    continuar = confirm("¿Deseas crear otra encuesta?");
  }
};

// Ejecutar el sistema
iniciarSistemaEncuestas();