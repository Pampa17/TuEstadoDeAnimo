import { preguntas } from './preguntas.js';

const nombreInput = document.getElementById('nombreUsuario');
const inicioDiv = document.getElementById('inicio');
const formulario = document.getElementById('formularioPreguntas');
const preguntasContainer = document.getElementById('preguntasContainer');
const resultadoDiv = document.getElementById('resultado');
const historialDiv = document.getElementById('historial');

window.iniciarTest = function() {
  const nombre = nombreInput.value.trim();
  if (!nombre) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  inicioDiv.classList.add('d-none');
  formulario.classList.remove('d-none');
  generarPreguntas();
};

function generarPreguntas() {
  preguntasContainer.innerHTML = '';
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

formulario.addEventListener('submit', function(e) {
  e.preventDefault();
  const respuestas = Array.from(formulario.elements)
    .filter(el => el.tagName === 'SELECT')
    .map(el => Number(el.value));

  if (respuestas.includes(NaN)) {
    alert("Responde todas las preguntas.");
    return;
  }

  const promedio = respuestas.reduce((a, b) => a + b, 0) / respuestas.length;
  const nombre = nombreInput.value.trim();
  let mensaje = "";

  if (promedio < 2) {
    mensaje = `${nombre}, necesitas atención profesional urgente. No estás solo, busca ayuda.`;
  } else if (promedio < 3) {
    mensaje = `${nombre}, tu estado emocional está bajo. Considera hablar con alguien de confianza.`;
  } else if (promedio < 4) {
    mensaje = `${nombre}, vas bien pero podrías mejorar. Intenta hacer ejercicios de respiración.`;
  } else {
    mensaje = `${nombre}, ¡tu estado emocional es excelente! Sigue así.`;
  }

  resultadoDiv.innerHTML = `<div class="alert alert-primary">${mensaje}</div>`;
  guardarResultado(nombre, promedio);
});

function guardarResultado(nombre, promedio) {
  const historial = JSON.parse(localStorage.getItem("historialEstadoAnimo")) || [];
  historial.push({
    nombre,
    fecha: new Date().toLocaleString(),
    resultado: promedio.toFixed(2)
  });
  localStorage.setItem("historialEstadoAnimo", JSON.stringify(historial));
}

window.mostrarHistorial = function() {
  const historial = JSON.parse(localStorage.getItem("historialEstadoAnimo")) || [];
  if (historial.length === 0) {
    historialDiv.innerHTML = "<p>No hay registros aún.</p>";
    return;
  }

  let tabla = `
    <table class="table table-bordered">
      <thead><tr><th>Nombre</th><th>Fecha</th><th>Resultado</th></tr></thead>
      <tbody>
  `;
  historial.forEach(reg => {
    tabla += `<tr><td>${reg.nombre}</td><td>${reg.fecha}</td><td>${reg.resultado}</td></tr>`;
  });
  tabla += "</tbody></table>";
  historialDiv.innerHTML = tabla;
};
