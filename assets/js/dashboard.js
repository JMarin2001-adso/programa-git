document.addEventListener("DOMContentLoaded", async () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const cerrarSesion = document.getElementById("cerrarSesion");
  const menuOpciones = document.getElementById("menuOpciones");
  const content = document.querySelector(".content");

  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch(`http://18.191.72.49:8000/user/dashboard-user/${userId}`);
    const data = await response.json();

    if (response.ok && data.data) {
      const user = data.data;
      const cargoLimpio = (user.cargo || "").trim().toLowerCase();

      document.getElementById("nombreUsuario").textContent = user.Nombre || "Desconocido";
      document.getElementById("cargoUsuario").textContent = cargoLimpio || "Sin cargo";

      cargarMenuPorCargo(cargoLimpio);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message || "No se pudo cargar el usuario"
      });
    }
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Fallo la conexión con el servidor"
    });
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
      "farmacia": {
        "Historia clínica": formularioHistoriaClinica,
        "Ordenamiento": formularioOrdenamiento,
        "Devoluciones": formularioDevoluciones,
        "Transacción": () => mostrarMensaje("Transacción seleccionado")
      },
      "asesores": {
        "Buscar admisión": formularioBuscarAdmision,
        "Crear admisión": formularioCrearAdmision,
        "Procedimientos": () => mostrarMensaje("Procedimientos seleccionado"),
        "Remisiones": () => mostrarMensaje("Remisiones seleccionado")
      },
      "medico": {
        "Buscar admisión": formularioBuscarAdmision,
        "Hospitalización": () => mostrarMensaje("Hospitalización seleccionado"),
        "Salida de paciente": () => mostrarMensaje("Salida de paciente seleccionado")
      },
      "enfermeria": {
        "Nota de enfermería": formularioNotaEnfermeria,
        "Devoluciones": formularioDevoluciones
      }
    };

    menuOpciones.innerHTML = "";

    if (!menus[cargo]) {
      menuOpciones.innerHTML = "<li>No hay opciones disponibles</li>";
      return;
    }

    for (let opcion in menus[cargo]) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#">${opcion}</a>`;
      li.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        menus[cargo][opcion]();
      });
      menuOpciones.appendChild(li);
    }
  }

  function mostrarFormulario(html) {
    content.innerHTML = html;
  }

  function mostrarMensaje(msg) {
    content.innerHTML = `<div class="form-box"><h2>${msg}</h2></div>`;
  }

  function formularioHistoriaClinica() {
    mostrarFormulario(`
      <div class="form-box">
        <h2>Historia clínica</h2>
        <input type="text" placeholder="Número de documento">
        <button>Buscar</button>
        <button>Salir</button>
      </div>
    `);
  }

  function formularioOrdenamiento() {
    mostrarFormulario(`
      <div class="form-box">
        <h2>Ordenamiento</h2>
        <input type="text" placeholder="Número de admisión">
        <button>Buscar</button>
        <button>Búsqueda avanzada</button>
        <button>Salir</button>
      </div>
    `);
  }

  function formularioDevoluciones() {
    mostrarFormulario(`
      <div class="form-box">
        <h2>Devoluciones</h2>
        <input type="text" placeholder="Número de admisión">
        <button>Buscar</button>
        <button>Salir</button>
      </div>
    `);
  }

  function formularioBuscarAdmision() {
    mostrarFormulario(`
      <div class="form-box">
        <h2>Buscar admisión</h2>
        <input type="text" placeholder="Número de admisión">
        <button>Buscar</button>
        <button>Búsqueda avanzada</button>
        <button>Salir</button>
      </div>
    `);
  }

  function formularioCrearAdmision() {
    mostrarFormulario(`
      <div class="form-box">
        <h2>Crear admisión</h2>
        <input type="text" placeholder="Primer nombre">
        <input type="text" placeholder="Segundo nombre">
        <input type="text" placeholder="Primer apellido">
        <input type="text" placeholder="Segundo apellido">
        <input type="text" placeholder="Número de documento">
        <input type="date">
        <input type="text" placeholder="EPS">
        <input type="email" placeholder="Correo">
        <input type="text" placeholder="Dirección">
        <input type="text" placeholder="Teléfono">
        <button>Crear admisión</button>
        <button>Salir</button>
      </div>
    `);
  }

  function formularioNotaEnfermeria() {
    mostrarFormulario(`
      <div class="form-box">
        <h2>Nota de enfermería</h2>
        <input type="text" placeholder="Número de admisión">
        <button>Buscar</button>
        <button>Búsqueda avanzada</button>
        <button>Salir</button>
      </div>
    `);
  }
});
