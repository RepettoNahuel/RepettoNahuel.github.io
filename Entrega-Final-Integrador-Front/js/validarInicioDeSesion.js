const formulario = document.getElementById("formulario");
const password = document.getElementById("password");
const errorPassword = document.getElementById("error-password");
const email = document.getElementById("email");
const errorEmail = document.getElementById("error-email");
    
document.addEventListener('DOMContentLoaded', () => {    

    formulario.addEventListener('submit', (event) => {        
        if (!formularioValido()) {           
            event.preventDefault(); // para que el formulario no se envíe
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
});

function formularioValido(){   
    let emailValido = validarEmail();
    let passValida = validarPassword();

    if(emailValido && passValida){
        return true;
    }
    else{
        return false;
    }   
}

function validarPassword(){
    if(!password.value){        
        errorPassword.innerText = "La contraseña es obligatoria";
        password.classList.add("ingresoError");
        return false;
    }
    else{
        errorPassword.innerText = "";        
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