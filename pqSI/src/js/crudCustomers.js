//Funciones para consumir la API

//URL Estatica del servidor - > En el servidor se tuvo que activar el CORS
var url = 'https://localhost:7016/api/customer';


//CRUD Customers 
async function Ver() {
    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

    const data = await response.json();
        refreshTabla();
        data.forEach(xd => {
            crearTabla(xd)
        });
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function agregar() {
    try {
        var customer = {
            fistName: document.getElementById("name").value,
            lastName: document.getElementById("lastname").value,
            email: document.getElementById("correo").value,
            phone: document.getElementById("telefono").value,
            address: document.getElementById("direccion").value

        }
        const resp = await fetch(url, {
            method: "POST",
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            Swal.fire({
                title: 'Exito!',
                text: 'Registro Agregado Exitosamente',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            Ver();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function editar() {
    try {
        var customer = {
            id: document.getElementById("id").value,
            fistName: document.getElementById("name").value,
            lastName: document.getElementById("lastname").value,
            email: document.getElementById("correo").value,
            phone: document.getElementById("telefono").value,
            address: document.getElementById("direccion").value
        }
        console.log(customer);
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer) //Body va fuera de los headers
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        } else {
            Swal.fire({
                title: 'Exito!',
                text: 'Registro Modificado',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            Ver();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function eliminar(id){
    try {
        const resp = await fetch(url +'/' + id, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },

        });
        if (!resp.ok) {
            throw new Error('Network response was not ok');
        }
        Swal.fire({
            title: 'Exito!',
            text: 'Registro Eliminado Exitosamente',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        Ver()
    } catch(error){
        console.log(error);
    }



}


//Funciones Complementarias
function crearTabla(data) {

    const body = document.getElementById("body");
    const tdNombre = document.createElement("td");
    tdNombre.innerHTML = data.fistName;
    const tdApellido = document.createElement("td");
    tdApellido.innerHTML = data.lastName;
    const tdEmail = document.createElement("td");
    tdEmail.innerHTML = data.email;
    const tdTelefono = document.createElement("td");
    tdTelefono.innerHTML = data.phone;
    const tdDireccion = document.createElement("td");
    tdDireccion.innerHTML = data.address;
    const tdAcciones = document.createElement("td");
    var btns = `
    <a class="waves-effect waves-light btn yellow" onclick="completar(${data.id})">Editar</a>
    <a class="waves-effect waves-light btn red" onclick="eliminar(${data.id})">Eliminar</a>
`;

    tdAcciones.innerHTML = btns;
    const tr = document.createElement("tr");

    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefono);
    tr.appendChild(tdDireccion);
    tr.appendChild(tdAcciones);
    body.appendChild(tr);
}

function limpiarForm(){
    document.getElementById("name").value = '';
    document.getElementById("lastname").value = '';
    document.getElementById("correo").value = '';
    document.getElementById("telefono").value = '';
    document.getElementById("direccion").value = ''

}
function refreshTabla() {
    const body = document.getElementById("body");
    body.innerHTML = "";
}

function cambio(){
    const agre = document.getElementById("agre");
    const add = document.getElementById("add");
    const edit = document.getElementById("edit");
    add.style.display = "none";
    edit.style.display = "block";

    agre.addEventListener("click", () => {
        add.style.display = "block";
        edit.style.display = "none";
    })
    
}

async function completar(id) {
    try {
        cambio();
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        data.forEach(xd => {
            if (xd.id == id) {
                document.getElementById("id").value = id;
                document.getElementById("name").value = xd.fistName;
                document.getElementById("lastname").value = xd.lastName;
                document.getElementById("correo").value = xd.email;
                document.getElementById("telefono").value = xd.phone;
                document.getElementById("direccion").value = xd.address;
                abrirModal();
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

//Inicio de Metodos Principales
document.addEventListener("DOMContentLoaded", () => {
    Ver();
})


