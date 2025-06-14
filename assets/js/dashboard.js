document.addEventListener("DOMContentLoaded", async () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const cerrarSesion = document.getElementById("cerrarSesion");
  const menuOpciones = document.getElementById("menuOpciones");

  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`http://18.216.79.200:8000/user/dashboard-user/${userId}`);
    const data = await response.json();

    console.log("Respuesta completa del backend:", data);

    if (response.ok && data.data) {
      const user = data.data;
      const cargoLimpio = (user.cargo || "").trim().toLowerCase();

      document.getElementById("nombreUsuario").textContent = user.Nombre || "Desconocido";
      document.getElementById("cargoUsuario").textContent = cargoLimpio || "Sin cargo";

      console.log("Cargo recibido del backend:", user.cargo);
      console.log("Cargo procesado:", cargoLimpio);

      cargarMenuPorCargo(cargoLimpio);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message || "No se pudo cargar el usuario"
      });
      document.getElementById("nombreUsuario").textContent = "Desconocido";
      document.getElementById("cargoUsuario").textContent = "Desconocido";
      menuOpciones.innerHTML = "";
    }
  } catch (e) {
    console.error("Error al cargar usuario:", e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Fallo la conexión con el servidor"
    });
    menuOpciones.innerHTML = "";
  }

  burger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  cerrarSesion.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

  function cargarMenuPorCargo(cargo) {
    const menus = {
      "farmacia": [
        "Buscar por ID",
        "Buscar admisión",
        "Ordenamiento",
        "Devoluciones",
        "Transacción"
      ],
      "asesores": [
        "Abrir admisión",
        "Crear admisión",
        "Procedimientos",
        "Remisiones"
      ],
      "medico": [
        "Buscar admisión",
        "Hospitalización",
        "Salida de paciente"
      ],
      "enfermeria": [
        "Buscar admisión",
        "Nota de enfermería",
        "Consumo",
        "Devoluciones"
      ]
    };

    if (!menus[cargo]) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: `Cargo recibido no válido: "${cargo}"`
      });
    }

    const opciones = menus[cargo] || ["Sin opciones disponibles"];
    menuOpciones.innerHTML = "";

    opciones.forEach(opcion => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${opcion}</a>`;
      menuOpciones.appendChild(li);
    });
  }
});
