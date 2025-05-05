const API_BASE = "http://127.0.0.1:8000"

async function fetchDepartamentos() {
    const res= await fetch(`${API_BASE}/departamento/get-departamento`);
    const data=await res.json()
    //console.log(data)
    
    const tbody=document.querySelector("#Departamentostable tbody");
    tbody.innerHTML="";

    data.data-forEach((d)=>{
        const row=`<tr>
        <td>${cargo}</td>
        <td>${designacion}</td>
        <td>${CodigoUsuario}</td>
        </tr>
        `;
        tbody.innerHTML +=row
    })
}

fetchDepartamentos()

