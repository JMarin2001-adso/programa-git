    const API_BASE = "18.216.79.200:8000";

    let signUp = document.getElementById("signUp");
    let signIn = document.getElementById("signIn");
    let nameInput = document.getElementById("nameInput");
    let title = document.getElementById("title");
    let mensaje = document.getElementById("mensaje");

    signIn.onclick = function () {
      nameInput.style.maxHeight = "0px";
      title.innerHTML = "Login";
      signUp.classList.add("disable");
      signIn.classList.remove("disable");
    };

    signUp.onclick = function () {
      nameInput.style.maxHeight = "60px";
      title.innerHTML = "Registro";
      signUp.classList.remove("disable");
      signIn.classList.add("disable");
    };

    // Registro
    signUp.addEventListener("click", async () => {
      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const contrasena = document.getElementById("contrasena").value;

      try {
        const response = await fetch(`${API_BASE}/auth/registro`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, correo, contrasena }),
        });
        const data = await response.json();
        mensaje.style.color = "green";
        mensaje.textContent = data.mensaje || data.detail;
      } catch (error) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error en el registro";
      }
    });

    // Login
    signIn.addEventListener("click", async () => {
      const correo = document.getElementById("correo").value;
      const contrasena = document.getElementById("contrasena").value;

      try {
        const response = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contrasena }),
        });
        const data = await response.json();
        if (response.ok) {
          mensaje.style.color = "green";
          mensaje.textContent = data.mensaje;
          localStorage.setItem("usuarioNombre", data.usuario);
          setTimeout(() => {
            window.location.href = "dashboard.html"; // redirección después del login
          }, 1500);
        } else {
          mensaje.style.color = "red";
          mensaje.textContent = data.detail || "Error en el login";
        }
      } catch (error) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error en el login";
      }
    });
