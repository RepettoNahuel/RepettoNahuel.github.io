document.body.addEventListener("click", (event) =>{    

    let div = event.target.parentElement; 
    let text = div.firstElementChild;
    
    if(event.target.classList[0] === 'completar'){
                          
        event.target.classList.remove("completar");
        event.target.classList.add("descompletar");
        event.target.innerText = `❌`;        

        div.classList.remove("nuevaTarea");
        div.classList.add("tareaCompletada"); 
        text.classList.remove("textTarea");
        text.classList.add("textTareaCompletada");   

        actualizar(text.innerText, 'completo');        
    }

    else if(event.target.classList[0] === 'descompletar'){                     
        
        event.target.classList.remove("descompletar");
        event.target.classList.add("completar");
        event.target.innerText = `✔️`;  

        div.classList.remove("tareaCompletada"); 
        div.classList.add("nuevaTarea");
        text.classList.remove("textTareaCompletada");
        text.classList.add("textTarea");      
        
        actualizar(text.innerText, 'enProceso');     
    }
});

function actualizar(tareaActualizable, estadoActualizable){
    // Configuración de la solicitud fetch
    const configuracionFetch = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({tarea: tareaActualizable, estado: estadoActualizable}) 
    };
    
    fetch('actualizar-registro.php', configuracionFetch)
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