const tarea = document.getElementById("tarea");
const lista = document.getElementById("lista-de-tareas");

crear.addEventListener("click", (event) =>{   
    crearTarea();    
});

document.body.addEventListener("keypress", (event) => {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.keyCode === 13) {
        crearTarea();             
    }
  });

function crearTarea(){
    let nonSpaceRegex = /\S/; //cualquier cosa que no sea espacio en blanco
    
    if(!nonSpaceRegex.test(tarea.value)){        
        alert("Ingrese una tarea para poder registrarla.")
    }
    else{
        let spaceRegex = /^(\s+)|(\s+)$/g; // espacios en blanco al principio y al final
        let textoTarea = tarea.value.replace(spaceRegex, "");          
        tarea.value = "";

        let tareaNueva = true;
        const todosP = document.querySelectorAll('p');
 
        todosP.forEach((item) => {
            if(item.innerText === textoTarea){
                tareaNueva = false;
            }
        });
            
        if(tareaNueva){
            const div = document.createElement('div');
            div.innerHTML = `                  
            <p class="textTarea">${textoTarea}</p>
            <button class="completar">✔️</button>
            <button class="eliminar">🗑️</button>                   
            `;
            div.classList.add("nuevaTarea");
            lista.appendChild(div);      
 
            enviarTarea(textoTarea);
        }
        else{
            alert("Ingrese una tarea que aún no este registrada.")
        } 
    }
}  

function enviarTarea(tareaNueva){
    // Configuración de la solicitud fetch
    const configuracionFetch = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({tarea: tareaNueva}) 
    };
    
    fetch('agregar-registro.php', configuracionFetch)
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