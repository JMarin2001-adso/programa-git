const API_BASE = "http://18.216.79.200:8000"

//creacion GET

async function fetchDepartamentos() {
    const res= await fetch(`${API_BASE}/departamento/get-departamento`);//`` estas bactist sirven para concatenar y es mucho mas limpia que comillas sencillas o dobles
    const departamento=await res.json()//el async siempre va acompañados por await.
    //console.log(data)
    

    const tbody=document.querySelector("#Departamentostable tbody");
    tbody.innerHTML="";

    departamento.data.forEach((d)=>{
        const row=`<tr>
        <td>${d.cargo}</td>
        <td>${d.Nombre}</td>
        <td>${d.areaAsignada}</td>
        <td>${d.id}</td>
        </tr>
        `;
        tbody.innerHTML +=row
    })

}
//peticion post
function openModaldepartamento(){
    document.getElementById("modaldepartamento").style.display="flex";//flex para mostrar el modal
}

function closeModal(){
    document.getElementById("modaldepartamento").style.display ="none";// none para cerrar modal
    document.getElementById("departamentoForm").request();//para limpiara formilario
    
}

//cargar datos de usuario
async function fetchUsuarios() {
    const res= await fetch(`${API_BASE}/user/get-users`);
    const users=await res.json()
    //console.log(users);

    const select=document.getElementById("usuario")
    //select.innerHTML="";

    users.data.forEach((u)=>{
        const option = document.createElement("option");
        option.textContent =`${u.Nombre}`
        option.value = u.id;
        select.appendChild(option);
    })

}
async function fetchCargos() {
    const res= await fetch(`${API_BASE}/departamento/get-departamento/`);
    const users=await res.json()
    //console.log(users);

    const select=document.getElementById("cargo")
    //select.innerHTML="";

    users.data.forEach((d)=>{
        const option = document.createElement("option");
        option.textContent =`${d.cargo}`
        option.value = d.id;
        select.appendChild(option);
    })

}
async function fetchArea() {
    const res= await fetch(`${API_BASE}/departamento/get-departamento/`);
    const users=await res.json()
    //console.log(users);

    const select=document.getElementById("area")
    //select.innerHTML="";

    users.data.forEach((d)=>{
        const option = document.createElement("option");
        option.textContent =`${d.areaAsignada}`
        option.value = d.id;
        select.appendChild(option);
    })

}
async function createDeparmento() {
    const cargo= document.getElementById("cargo").value;
    const areaAsignada= document.getElementById("areaAsignada").value;
    const codigoUsuario= document.getElementById("codigoUsuario").value;

    const res= await fetch(`${API_BASE}/departamento/create-departamento/`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({cargo,areaAsignada,codigoUsuario})
    });

    if (res.ok){
        Swal.fire(
            "Ëxito",
            "creado con existo",
            "success")
        
        closeModal();
        fetchDepartamentos();
        }
    else{
        Swal.fire(
            "Ëxito",
            "no se pudo crear",
            "error")

        }
}




fetchDepartamentos();
fetchUsuarios();
fetchCargos();
fetchArea();
