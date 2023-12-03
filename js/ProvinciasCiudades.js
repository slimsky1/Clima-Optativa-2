document.addEventListener("DOMContentLoaded", function () {
  const provinciaDropdown = document.getElementById("provincia");
  const ciudadDropdown = document.getElementById("ciudad");

  // Realizar la solicitud a la API de provincias
  fetch(
    "https://apis.datos.gob.ar/georef/api/provincias?campos=nombre,id&max=100"
  )
    .then((response) => response.json())
    .then((data) => {
      // Ordenar las provincias alfabéticamente
      const provinciasOrdenadas = data.provincias.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );

      // Agregar las provincias al dropdown
      provinciasOrdenadas.forEach((provincia) => {
        const option = document.createElement("option");
        option.value = provincia.nombre;
        option.text = provincia.nombre.toUpperCase();
        provinciaDropdown.add(option);
      });
    })
    .catch((error) => {
      console.error("Error al obtener provincias:", error);
    });

  // Función para cargar las ciudades en función de la provincia seleccionada
  window.cargarCiudades = function () {
    const provinciaSeleccionada = provinciaDropdown.value;
    ciudadDropdown.innerHTML =
      '<option value="" selected>Selecciona una ciudad</option>';

    // Verificar que se haya seleccionado una provincia
    if (provinciaSeleccionada) {
      // Realizar la solicitud a la API de ciudades de la provincia seleccionada
      fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinciaSeleccionada}&campos=nombre,id&max=100`
      )
        .then((response) => response.json())
        .then((data) => {
          // Ordenar las ciudades alfabéticamente
          const ciudadesOrdenadas = data.localidades.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );

          // Agregar las ciudades al dropdown
          ciudadesOrdenadas.forEach((ciudad) => {
            const option = document.createElement("option");
            option.value = ciudad.nombre;
            option.text = ciudad.nombre;
            ciudadDropdown.add(option);
          });
        })
        .catch((error) => {
          console.error("Error al obtener ciudades:", error);
        });
    }
  };
});
