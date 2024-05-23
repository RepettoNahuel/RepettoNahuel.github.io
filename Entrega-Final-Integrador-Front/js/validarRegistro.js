const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const password = document.getElementById("password");
const fecha = document.getElementById("fecha");
const pais = document.getElementById("pais");
const checkbox = document.getElementById("checkbox");

const errorNombre = document.getElementById("error-nombre");
const errorApellido = document.getElementById("error-apellido");
const errorPassword = document.getElementById("error-password");
const errorEmail = document.getElementById("error-email");
const errorFecha = document.getElementById("error-fecha");
const errorPais = document.getElementById("error-pais");
const errorCheckbox = document.getElementById("error-checkbox");
    
document.addEventListener('DOMContentLoaded', () => {    

    formulario.addEventListener('submit', (event) => {        
        if (!formularioValido()) {           
            event.preventDefault(); // para que el formulario no se envíe
        } 
    });

    nombre.addEventListener('input', () => {      
        if (!nombre.value !== '') {
            errorNombre.innerText = "";
            nombre.classList.remove("ingresoError");
        }
    });

    apellido.addEventListener('input', () => {
        if (!apellido.value !== '') {
            errorApellido.innerText = "";
            apellido.classList.remove("ingresoError");
        }
    });

    password.addEventListener('input', () => {      
        if (!password.value !== '') {
            errorPassword.innerText = "";
            password.classList.remove("ingresoError");
        }
    });

    email.addEventListener('input', () => {
        if (!email.value !== '') {
            errorEmail.innerText = "";
            email.classList.remove("ingresoError");
        }
    });

    fecha.addEventListener('input', () => {
        if (!fecha.value !== '') {
            errorFecha.innerText = "";
            fecha.classList.remove("ingresoError");
        }
    });

    pais.addEventListener('input', () => {
        if (!pais.value !== '') {
            errorPais.innerText = "";
            pais.classList.remove("ingresoError");
        }
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            errorCheckbox.innerText = "";
        }
    });
});

function formularioValido(){   
    let nombreValido = validarCadena(nombre, errorNombre, "El nombre es obligatoria");
    let apellidoValido = validarCadena(apellido, errorApellido, "El apellido es obligatoria");    
    let passValida = validarCadena(password, errorPassword, "La contraseña es obligatoria");
    let fechaValida = validarCadena(fecha, errorFecha, "La fecha de nacimiento es obligatoria");
    let paisValido = validarCadena(pais, errorPais, "El pais es obligatoria");
    let emailValido = validarEmail();    
    let checkboxValido = true;
    
    if (checkbox.checked) {
        checkboxValido = true;
    } else {
        checkboxValido = false;
        errorCheckbox.innerText = "Debes aceptar los términos y condiciones";
    }    

    if(nombreValido && apellidoValido && emailValido && passValida && fechaValida && paisValido && checkboxValido){
        return true;
    }
    else{
        return false;
    }   
}

function validarCadena(elemento, error, frase){
    if(!elemento.value){        
        error.innerText = frase;
        elemento.classList.add("ingresoError");
        return false;
    }
    else{
        error.innerText = "";        
        return true;
    }
}

function validarEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email.value){        
        errorEmail.innerText = "El correo electrónico es obligatorio";
        email.classList.add("ingresoError");
        return false;
    }    
    else if (!emailRegex.test(email.value)) {
        errorEmail.innerText = "El correo electrónico no es válido";
        email.classList.add("ingresoError");
        return false;
    } 
    else {
        errorEmail.innerText = "";
        return true;
    }
}