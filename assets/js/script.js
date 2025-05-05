const API_BASE = "http://127.0.0.1:8000"

let userUpdate=null; //variable que determinar si el formulario es para crear o para editar el usuario


//2. Listar datos desde el API
async function loadUsers(){

  const res= await fetch(`${API_BASE}/user/get-users`);// el user get se saca de la ruta de la api
  const users =await res.json();

  const tbody= document.querySelector("#userTable tbody");
  tbody.innerHTML = "";
  

  users.data.forEach((u)=>{

    const badgeClass = u.Estado === 1 ? "badge-green" : "badge-red";//nos muestra el usuario en verde para activo y rojo para inactivo
    const badgeText = u.Estado === 1 ? "Activo" : "Inactivo";

    const row = `<tr>
    <td>${u.Nombre}</td>
    <td>${u.Direccion}</td>
    <td>${u.Email}</td>
    <td>${u.Password}</td> 
    <td>
    <span class="badge ${badgeClass}"> ${badgeText} </span> 
    </td>
    <td>
    <i class="fa-solid fa-pencil" title="Editar" onclick=openEditModal(${u.id})></i>
    <i class="fa-solid fa-toggle-on" title="Cambiar de estado" onclick=changeStatus(${u.id},${u.Estado})></i>
    </td>
    </tr>`;//elemento onclick se usa para recibir eventos, llama una funcion que va a definir en javascript en este caso openeditmodal llama el id

    tbody.innerHTML += row;
  });
}

//Gestión del modal
function openModal(){
  document.getElementById("modal").style.display= "flex";
  if(userUpdate){
    document.getElementById("formTitle").textContent="Actualizar Usuario";
    document.getElementById("submitButton").textContent="Actualizar";
  }
  else{
    document.getElementById("formTitle").textContent="Crear Usuario";
    document.getElementById("submitButton").textContent="crear";
    document.getElementById("userForm").reset();//verifica atraves de id o idetificador si ese modal se va ausar para activar o no
  }
  
}

function closeModal(){
  document.getElementById("modal").style.display= "none";
  userUpdate= null;
}

async function openEditModal(id){
  const res= await fetch(`${API_BASE}/user/get-user/${id}`);
  const response= await res.json();

  if(!res.ok || !response.data){
    return Swal.fire(
      "Error",
      "No se pudo cargar el usuario",
      "error"
    )
  }

  const user=response.data;

  document.getElementById("Nombre").value = user.Nombre || "";
  document.getElementById("Direccion").value = user.Direccion|| "";
  document.getElementById("Email").value = user.Email || "";
  document.getElementById("Password").value = user.Password || "";

  userUpdate= id;
  openModal();
}

//2. Create / Update
async function createUser() {

  const user={
      Nombre: document.getElementById("Nombre").value,
      Direccion: document.getElementById("Direccion").value,
      Email: document.getElementById("Email").value,
      Password: document.getElementById("Password").value,
  }
  console.log(createUser)


  const endpoint= userUpdate
  ?`${API_BASE}/user/update-user/${userUpdate}` 
  :`${API_BASE}/user/create-user`;//usa para crear
  //los dos puntos empezando la linea de arriba significan que si no va actuazar entonces va a crear
  
  
  const method = userUpdate ? "PUT" : "POST"; //PUT para actualizar y POST para crear se usan para que se cumpla una de las dos funciones


  const res= await fetch(endpoint, {
    method,
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(user)
  });

  console.log(res)

  if(res.ok){
    Swal.fire(
      "Ëxito",
      userUpdate ? "Usuario Actualizado" : "Usuario creado",
      "success"
    )
  closeModal();
  loadUsers();

  }else{
    const error= await res.json();
    Swal.fire(
      "Error",
      error.detail || "Ocurrió un problema", "error",
      "error"
    )
  }

  
}

//3. Change Status
async function changeStatus(user_id, EstadoActual){


  const newState= EstadoActual === 1 ? 0 : 1;
  const accion= newState ===1  ? "activar" : "inactivar";

  Swal.fire({
    title: `¿Seguro que quiere ${accion} este usuario?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Si, cambiar estado"
  }).then((result)=>{
    if(result.isConfirmed){
      fetch(`${API_BASE}/user/change-status/${user_id}`, {method: "PATCH"})
      .then(()=> {
        Swal.fire("Cambiado", "El estado ha sido actualizado", "success");
         loadUsers()
      })
      .catch(()=>{
        Swal.fire("Error", "No se pudo cambiar el estado", "error");
      })

    }
  })
}
//Cargar data
loadUsers()

document.getElementById("userForm").addEventListener("submit", function(e){
  e.preventDefault();
  createUser();
})


