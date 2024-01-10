document.body.addEventListener("click", (event) =>{    
    
    if(event.target.classList[0] === 'eliminar'){
        let div = event.target.parentElement; 
        let p = div.firstElementChild;  
        let tarea = p.innerText;
                
        eliminarRegistro(tarea);        
        div.remove(); 
    }
});

function eliminarRegistro(tareaEliminable){
    // Configuración de la solicitud fetch
    const configuracionFetch = {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({tarea: tareaEliminable}) 
    };
    
    fetch('eliminar-registro.php', configuracionFetch)
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