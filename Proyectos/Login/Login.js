const elemName = document.getElementById("name");
const elemPass = document.getElementById("pass");
const elemLogin = document.getElementById("contenedor-login");
const elemBienvenida = document.getElementById("contenedor-img-bienvenida");

document.body.addEventListener("click", (evento) => {
    let elemento = evento.target;
    let id = elemento.getAttribute("id");
    let elementoPadre;
    let icon;
    
    if(id === "name" || id === "pass"){
        elementoPadre = evento.target.parentElement;
        elementoPadre.style.borderColor = "rgb(10, 118, 241)";
        icon = elementoPadre.firstElementChild;
        icon.style.color = "rgb(10, 118, 241)";
    }

    if(id !== "name"){
        if(!elemName.value){
            elementoPadre = elemName.parentElement;
            elementoPadre.style.borderColor = "rgb(34, 32, 32)";
            icon = elementoPadre.firstElementChild;
            icon.style.color = "rgb(34, 32, 32)";
        }
    }

    if(id !== "pass"){
        if(!elemPass.value){
            elementoPadre = elemPass.parentElement;
            elementoPadre.style.borderColor = "rgb(34, 32, 32)";
            icon = elementoPadre.firstElementChild;
            icon.style.color = "rgb(34, 32, 32)";
        } 
    }                   
});

inicio.addEventListener("click", (evento) => {
    if(validarEntradas()){
        // Hacer la solicitud fetch al archivo PHP    
        fetch('obtener-usuarios.php')
            .then(response => {
                // Verificar si la respuesta del servidor es exitosa
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                // Devolver los datos recibidos por el archivo PHP en formato JSON
                return response.json();
            })
            .then(data => {                                    
                // Verifica si los datos ingresados se encuntran dentro de los registros de la BD 
                let usuarioValido = data.some(row => {                        
                    return elemName.value === row.user && elemPass.value === row.pass;
                });                  
                
                if(usuarioValido){
                    elemLogin.remove();                          

                    const div = document.createElement('div');
                    div.classList.add("contenedor-img-bienvenida");
                    document.body.appendChild(div);   
                    
                    const img = document.createElement('img');
                    img.classList.add("img");
                    img.setAttribute("src", "imagenes/listo.png");
                    div.appendChild(img); 

                    const texto = document.createElement('p');
                    texto.innerText = "Ingreso exitoso";
                    div.appendChild(texto); 
                    setTimeout("redireccionar()", 3000);
                }
                else{
                    alert('El nombre de usuario o la contraseña es incorrecta.');
                }                            
            })
            .catch(error => {
                // Manejar errores en la solicitud o en la respuesta del archivo PHP
                console.error('Error:', error);
            });  
    }
});

registro.addEventListener("click", (evento) => {
    if(validarEntradas()){
        // Hacer la solicitud fetch al archivo PHP    
        fetch('obtener-usuarios.php')
            .then(response => {
                // Verificar si la respuesta del servidor es exitosa
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                // Devolver los datos recibidos por el archivo PHP en formato JSON
                return response.json();
            })
            .then(data => {                                    
                // Verifica si los datos ingresados se encuntran dentro de los registros de la BD 
                let usuarioInvalido = data.some(row => {                        
                    return elemName.value === row.user;
                });                  
                
                if(!usuarioInvalido){
                    elemLogin.remove();                          

                    const div = document.createElement('div');
                    div.classList.add("contenedor-img-bienvenida");
                    document.body.appendChild(div);   
                    
                    const img = document.createElement('img');
                    img.classList.add("img");
                    img.setAttribute("src", "imagenes/listo.png");
                    div.appendChild(img); 

                    const texto = document.createElement('p');
                    texto.innerText = "Registro exitoso";
                    div.appendChild(texto); 

                    //guardar nuevo usuario en la BD
                    agregarUsuario(elemName.value, elemPass.value);
                    setTimeout("redireccionar()", 3000);
                }
                else{
                    alert('Lo sentimos, el nombre de usuario ingresado ya esta en uso.');
                }                            
            })
            .catch(error => {
                // Manejar errores en la solicitud o en la respuesta del archivo PHP
                console.error('Error:', error);
            });  
    }    
});

function validarEntradas(){
    const testRegex =  /[^A-Za-z0-9]/;
    //valido que no esten vacios
    if(!elemName.value || !elemPass.value){
        alert('Por favor, ingrese nombre de usuario y contraseña');
        return false;
    }
    else{
        //valido que solo hay caracteres validos
        if(testRegex.test(elemName.value) || testRegex.test(elemPass.value) || 
           elemPass.value.length < 4 || elemPass.value.length < 4 ){
            alert('Solo se aceptan caracteres alfanuméricos (no menos de 4 caracteres por entrada).');
            return false;
        }                       
    }
    return true;
}

function agregarUsuario(nuevoUser, nuevoPass){
    // Configuración de la solicitud fetch
    const configuracionFetch = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: nuevoUser, pass: nuevoPass}) 
    };
    
    fetch('agregar-usuario.php', configuracionFetch)
        .then(response => {
            // Verificar si la respuesta del servidor es exitosa
            if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
            }           
        })
        .catch(error => {           
            console.error('Error:', error);
        });
}

function redireccionar(){
    window.location.href = "index.html";
}   