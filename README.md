# 🧠 Evaluador de Estado de Ánimo - Aplicación Web

Esta es una aplicación web educativa desarrollada como parte del **Examen Parcial III** del curso de **Ingeniería de Software**. Su objetivo es ayudar a los usuarios a evaluar su estado emocional actual mediante un sencillo test de 30 preguntas, con resultados personalizados y almacenamiento local de los registros.

---

## 📌 Objetivo del Proyecto

Evaluar el estado de ánimo de los usuarios a través de preguntas relacionadas con emociones, hábitos y comportamiento, usando una escala del 1 al 5:

- **1:** Atención inmediata
- **2:** Bajo
- **3:** Moderado
- **4:** Bueno
- **5:** Excelente

Con base en las respuestas, se calcula un **promedio emocional** y se genera un **mensaje personalizado**.

---

## 🛠 Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES Modules)
- `localStorage` del navegador

---

## 📁 Estructura del proyecto

TuEstadoDeAnimo/
├── index.html # Página principal de la aplicación
├── style.css # Estilos personalizados
├── preguntas.js # Contiene las 30 preguntas del test
├── app.js # Lógica del test, cálculo de promedio, historial, etc.
└── README.md # Manual de usuario (este archivo)

---

## 🧑‍💻 Instrucciones de uso

1. **Abrir la página index.html** en un navegador moderno (Google Chrome, Firefox, Edge, etc.).
2. Ingresar el nombre del usuario en el campo de texto y hacer clic en **"Iniciar Test"**.
3. Responder las 30 preguntas seleccionando una opción del 1 al 5 para cada una.
4. Al finalizar, hacer clic en **"Enviar respuestas"** para obtener el resultado.
5. El mensaje personalizado se mostrará en pantalla.
6. El resultado será guardado automáticamente en el historial local del navegador.
7. Puedes hacer clic en **"Mostrar histórico"** para ver todos los registros guardados.

---

## 📊 Almacenamiento de datos

Los resultados se guardan localmente en el navegador usando `localStorage`. Cada registro contiene:

- Nombre del usuario
- Fecha y hora del test
- Resultado promedio del estado de ánimo

> ⚠️ Los datos solo estarán disponibles en el mismo navegador donde se hizo la prueba. Si se borra el caché o almacenamiento, los datos se perderán.

---

## 🤖 Generación de preguntas mediante IA

- **Plataforma utilizada:** ChatGPT
- **Versiones del prompt:** 2
- **Ajustes realizados:** Se modificaron las primeras preguntas para alinearlas mejor con la escala de respuestas esperada (1 a 5).

---

## 🧾 Licencia

Proyecto académico. Su uso está destinado a fines educativos y de aprendizaje.

---

## 🙌 Autor

Juan Pablo Santoyo Diaz
Estudiante de Ingeniería de Software  
Universidad de Santander – UDES  
Docente: Jeison Mauricio Delgado González
