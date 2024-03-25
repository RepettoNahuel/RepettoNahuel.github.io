window.onload = () => {
    
    // Hacer la solicitud fetch al archivo PHP    
    fetch('obtener-registros.php')
        .then(response => {
        // Verificar si la respuesta del servidor es exitosa
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        // Devolver los datos recibidos por el archivo PHP en formato JSON
        return response.json();
        })
        .then(data => {    

            const listaTareas = document.getElementById('lista-de-tareas');

            // Limpiar filas existentes
            listaTareas.innerHTML = '';

            // Agregar filas con los datos obtenidos
            data.forEach(row => {
                const div = document.createElement('div');
                if(row.estado == 'enProceso'){
                    div.innerHTML =
                    `                  
                    <p class="textTarea">${row.tarea}</p>
                    <button class="completar">✔️</button>
                    <button class="eliminar">🗑️</button>                   
                    `;
                    div.classList.add("nuevaTarea");
                }
                else{
                    div.innerHTML =
                    `                  
                    <p class="textTareaCompletada">${row.tarea}</p>
                    <button class="descompletar">❌</button>
                    <button class="eliminar">🗑️</button>                   
                    `;
                    div.classList.add("tareaCompletada");
                }
                listaTareas.appendChild(div);
            });             
        })
        .catch(error => {
        // Manejar errores en la solicitud o en la respuesta del archivo PHP
        console.error('Error:', error);
        });   
};