// Función para consultar el clima
async function consultarClima() {
  const provincia = document.getElementById("provincia").value;
  const ciudad = document.getElementById("ciudad").value;
  /* const nivelPersiana = 0; */

  if (provincia && ciudad) {
    const apiKey = "2089eb94069bfd797c0532b1efaf41d8";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${provincia},AR&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (
        data.main &&
        data.main.temp &&
        data.weather &&
        data.weather[0] &&
        data.weather[0].description
      ) {
        mostrarEmojiConTransicion(
          obtenerTextoClima(data.main.temp, data.weather[0].description)
        );
        postMessage(obtenerNivelPersiana(data.weather[0].description));
      } else {
        alert("No se encontró información del clima.");
      }
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
      alert("Hubo un error al obtener los datos del clima.");
    }
  } else {
    console.error("Por favor, selecciona una provincia y una ciudad.");
  }
}

function obtenerTextoClima(temperatura, descripcionClima) {
  const emoji = obtenerEmojiClima(descripcionClima);
  return `${(temperatura - 273.15).toFixed(2)} °C ${emoji}`;
}

function mostrarEmojiConTransicion(texto) {
  const emojiContainer = document.getElementById("emoji-container");
  emojiContainer.textContent = texto;
  emojiContainer.style.opacity = "1";
}

// Asigno un emoji basado en la descripción del clima
function obtenerEmojiClima(descripcionClima) {
  switch (descripcionClima.toLowerCase()) {
    case "clear sky":
      return "☀️";
    case "few clouds":
    case "scattered clouds":
      return "🌤️";
    case "broken clouds":
    case "overcast clouds":
      return "☁️";
    case "shower rain":
    case "rain":
      return "🌧️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "❄️";
    case "mist":
      return "🌫️";
    default:
      return "🤷‍♂️";
  }
}

function obtenerNivelPersiana(descripcionClima) {
  const fechaActual = new Date();
  const hora = fechaActual.getHours();

  if (hora > 20 && hora < 9) {
    return 0;
  } else {
    switch (descripcionClima.toLowerCase()) {
      case "clear sky":
        return 100;
      case "few clouds":
      case "scattered clouds":
        return 75;
      case "broken clouds":
      case "overcast clouds":
        return 70;
      case "shower rain":
      case "rain":
        return 50;
      case "thunderstorm":
        return 10;
      case "snow":
        return 0;
      case "mist":
        return 5;
      default:
        return 50;
    }
  }
}
