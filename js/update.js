const newCustomerUrl = 'https://bicimarketunal.herokuapp.com/biciapp/updateCustomer/';
//const newCustomerUrl = 'http://127.0.0.1:8000/biciapp/updateCustomer/';

const userId = sessionStorage.getItem("clientId");

function validate_names(val) {
    const letters = /^[A-Z a-zÁÉÍÓÚáéíóúñ]+$/;
    if (val.match(letters))
        return true;
    else
        return false;
}

function validate_id(val) {
    if (Number(val) > 1000)
        return true;
    else
        return false;
}

function validate_password(val) {
    if (val.length >= 5)
        return true;
    else
        return false;
}

function collectData(evt) {
    evt.preventDefault();
    const firstName = document.update.primernombre.value.trim();
    const middleName = document.update.segundonombre.value.trim();
    const firstSurname = document.update.primerapellido.value.trim();
    const secondSurname = document.update.segundoapellido.value.trim();
    const phone = document.update.telefono.value.trim();
    const email = document.update.email.value.trim();
    const departament = document.update.departamento.value.trim();
    const city = document.update.ciudad.value.trim();
    const neighborhood = document.update.barrio.value.trim();
    const address = document.update.direccion.value.trim();
    const password = document.update.contrasena.value;

    let result = true;//ojo con este nombre de variable
    if (firstName) {
        let result = validate_names(firstName);
        if (!result) {
            alert("Nombre no es válido");
            return;
        }
    }
    if (firstSurname) {
        result = validate_names(firstSurname);
        if (!result) {
            alert('Apellido no es válido');
            return;
        }
    }
    if (password) {
        result = validate_password(password);
        if (!result) {
            alert('Contraseña no es válida. Debe tener al menos 5 caracteres.');
            return;
        }
    }

    const customer = {}
    if (firstName)
        customer.primernombre =  firstName;
    if (middleName)
        customer.segundonombre = middleName;
    if (firstSurname)
        customer.primerapellido = firstSurname;
    if (secondSurname)
        customer.segundoapellido = secondSurname;
    if (phone)
        customer.telefono = phone;
    if (email)
        customer.correo = email;
    if (departament)
        customer.departamento = departament;
    if (city)
        customer.ciudad = city;
    if (neighborhood)
        customer.barrio = neighborhood;
    if (address)
        customer.direccion = address;
    if (password)
        customer.contrasena = password;
    console.log(customer);
    const dataToSend = JSON.stringify(customer);
    updateCustomer(dataToSend);
}

function updateCustomer(data) {
    const accessToken = sessionStorage.getItem("accessToken ")
    // Petición HTTP
    fetch(updateCustomerUrl + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken

        },
        body: data
    })
        .then(response => {
            console.log(response);
            if (response.ok)
                return response.text()
            else
                throw new Error(response.text());
        })
        .then(data => {
            console.log(data);
            alert("Datos actualizados")
            goBack();
        })
        .catch(error => {
            console.error("ERROR: ", error.message);
            alert("Error al actualizar datos");

            goBack()
        });
}

function goBack(){
    window.location.href = './cliente.html?id=' + userId;
}
/* function handleSuccess() {
    document.getElementById("formData").remove();
    alert("Actualizacion exitosa");
    const info = document.getElementById("info");
    const btnBack = document.createElement("button");
    window.history.go (-1);
    btnBack.innerText = "Regresar";
    info.appendChild(btnBack);
    
   
} */

/* function handleError(msg) {
    document.getElementById("formData").remove();
    const message = document.createElement("p");
    message.innerText = "No se pudo crear el cliente. Intente luego. " + msg;
    const info = document.getElementById("info");
    info.appendChild(message);
} */

// --------------------
//document.update.addEventListener("submit", collectData);

function showOldData() {
    const oldFName = sessionStorage.getItem('fname');
    const oldLName = sessionStorage.getItem('lname');
    const oldEmail = sessionStorage.getItem('email');

    document.actualizar.firstName.placeholder = oldFName;
    document.actualizar.lastName.placeholder = oldLName;
    document.actualizar.email.placeholder = oldEmail;
}

// --------------------
document.update.addEventListener("submit", collectData);
document.addEventListener('DOMContentLoaded', showOldData);