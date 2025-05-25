// Importamos las preguntas desde el archivo preguntas.js
import { preguntas } from './preguntas.js';

// Referencias a los elementos del DOM (HTML) que usaremos
const nombreInput = document.getElementById('nombreUsuario');
const inicioDiv = document.getElementById('inicio');
const formulario = document.getElementById('formularioPreguntas');
const preguntasContainer = document.getElementById('preguntasContainer');
const resultadoDiv = document.getElementById('resultado');
const historialDiv = document.getElementById('historial');

// Función que se ejecuta cuando el usuario hace clic en "Iniciar Test"
window.iniciarTest = function() {
  const nombre = nombreInput.value.trim(); // Obtener y limpiar el nombre ingresado

  // Validar que el nombre no esté vacío
  if (!nombre) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  // Ocultar el formulario inicial y mostrar el formulario con las preguntas
  inicioDiv.classList.add('d-none');
  formulario.classList.remove('d-none');

  // Generar dinámicamente las preguntas del test
  generarPreguntas();
};

// Función que genera todas las preguntas del test dinámicamente en el HTML
function generarPreguntas() {
  preguntasContainer.innerHTML = ''; // Limpiar el contenedor por si ya había contenido

  // Recorrer todas las preguntas y agregarlas al formulario
  preguntas.forEach((pregunta, index) => {
    preguntasContainer.innerHTML += `
      <div class="mb-2">
        <label>${index + 1}. ${pregunta}</label>
        <select class="form-select" required name="p${index}">
          <option value="">Selecciona una opción</option>
          <option value="1">1 - Atención inmediata</option>
          <option value="2">2 - Bajo</option>
          <option value="3">3 - Moderado</option>
          <option value="4">4 - Bueno</option>
          <option value="5">5 - Excelente</option>
        </select>
      </div>
    `;
  });
}

// Evento que se ejecuta al enviar el formulario con las respuestas
formulario.addEventListener('submit', function(e) {
  e.preventDefault(); // Evitar recarga de la página

  // Obtener todas las respuestas del formulario como números
  const respuestas = Array.from(formulario.elements)
    .filter(el => el.tagName === 'SELECT')
    .map(el => Number(el.value));

  // Validar que todas las respuestas hayan sido seleccionadas
  if (respuestas.includes(NaN)) {
    alert("Responde todas las preguntas.");
    return;
  }

  // Calcular el promedio de todas las respuestas
  const promedio = respuestas.reduce((a, b) => a + b, 0) / respuestas.length;
  const nombre = nombreInput.value.trim(); // Obtener el nombre del usuario
  let mensaje = "";

  // Generar mensaje personalizado según el promedio obtenido
  if (promedio < 2) {
    mensaje = `${nombre}, necesitas atención profesional urgente. No estás solo, busca ayuda.`;
  } else if (promedio < 3) {
    mensaje = `${nombre}, tu estado emocional está bajo. Considera hablar con alguien de confianza.`;
  } else if (promedio < 4) {
    mensaje = `${nombre}, vas bien pero podrías mejorar. Intenta hacer ejercicios de respiración.`;
  } else {
    mensaje = `${nombre}, ¡tu estado emocional es excelente! Sigue así.`;
  }

  // Mostrar el resultado al usuario
  resultadoDiv.innerHTML = `<div class="alert alert-primary">${mensaje}</div>`;

  // Guardar el resultado en el almacenamiento local
  guardarResultado(nombre, promedio);
});

// Función que guarda los resultados en localStorage
function guardarResultado(nombre, promedio) {
  // Obtener el historial actual o inicializar uno nuevo
  const historial = JSON.parse(localStorage.getItem("historialEstadoAnimo")) || [];

  // Agregar el nuevo resultado
  historial.push({
    nombre,
    fecha: new Date().toLocaleString(), // Fecha y hora actuales
    resultado: promedio.toFixed(2) // Promedio con 2 decimales
  });

  // Guardar el historial actualizado en localStorage
  localStorage.setItem("historialEstadoAnimo", JSON.stringify(historial));
}

// Función que muestra el historial de resultados guardados
window.mostrarHistorial = function() {
  // Obtener historial desde localStorage
  const historial = JSON.parse(localStorage.getItem("historialEstadoAnimo")) || [];

  // Si no hay registros, mostrar un mensaje
  if (historial.length === 0) {
    historialDiv.innerHTML = "<p>No hay registros aún.</p>";
    return;
  }

  // Crear una tabla HTML para mostrar los registros
  let tabla = `
    <table class="table table-bordered">
      <thead><tr><th>Nombre</th><th>Fecha</th><th>Resultado</th></tr></thead>
      <tbody>
  `;

  // Agregar cada registro como fila de la tabla
  historial.forEach(reg => {
    tabla += `<tr><td>${reg.nombre}</td><td>${reg.fecha}</td><td>${reg.resultado}</td></tr>`;
  });

  tabla += "</tbody></table>";

  // Mostrar la tabla en el contenedor del historial
  historialDiv.innerHTML = tabla;
};
