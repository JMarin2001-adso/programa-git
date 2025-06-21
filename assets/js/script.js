const API_BASE = "http://18.191.80.162:8000";

let userUpdate = null;

// Crear o actualizar usuario
async function createUser() {
  const user = {
    Nombre: document.getElementById("Nombre").value,
    Direccion: document.getElementById("Direccion").value,
    Email: document.getElementById("Email").value,
    Password: document.getElementById("Password").value,
  };

  const endpoint = userUpdate
    ? `${API_BASE}/user/update-user/${userUpdate}`
    : `${API_BASE}/user/create-user/`;
  const method = userUpdate ? "PUT" : "POST";

  const res = await fetch(endpoint, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (res.ok) {
    Swal.fire(
      "Éxito",
      userUpdate ? "Usuario actualizado" : "Usuario creado",
      "success"
    );
    closeModal();
  } else {
    const error = await res.json();
    Swal.fire("Error", error.detail || "Ocurrió un problema", "error");
  }
}

// Login de usuario
async function loginUser() {
  const Email = document.getElementById("loginEmail").value;
  const Password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: Email, Password: Password }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("userId", data.usuario_id); // Guarda el userId
    Swal.fire("Bienvenido", `Hola ${data.usuario}`, "success").then(() => {
      window.location.href = "dashboard.html";
    });
  } else if (res.status === 401) {
    Swal.fire("Error", "Correo o contraseña incorrectos", "error");
  } else {
    Swal.fire("Error", "Ocurrió un problema al intentar iniciar sesión", "error");
  }
}

// Eventos
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  createUser();
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  loginUser();
});