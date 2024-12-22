var url = 'https://localhost:7016/api/customer';
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
Ver()

function crearTabla(data){

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
    <a class="waves-effect waves-light btn yellow" onclick="edit(${data.id})">Editar</a>
    <a class="waves-effect waves-light btn red" onclick="elim(${data.id})">Eliminar</a>
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
function refreshTabla(){
    const body = document.getElementById("body");
    body.innerHTML = "";
}

async function elim(id){
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
        alert("Registro Eliminado Exitosamente.");
        Ver()
    } catch(error){
        console.log(error);
    }



}

async function  agregar() {
    try{
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
        else{
            alert("Registro Exitoso");
            Ver();
        }
    } catch(error){
        console.error('Error:', error);
    }
}

async function edit(id) {

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

        data.forEach(xd => {
            if (xd.id == id) {
                document.getElementById("name").value = xd.fistName;
                document.getElementById("lastname").value = xd.lastName;
                document.getElementById("correo").value = xd.email;
                document.getElementById("telefono").value = xd.phone;
                document.getElementById("direccion").value = xd.address;
               // console.log(xd);

                abrirModal();
            }
        });
      //  console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
