const tarea = document.getElementById("tarea");
const lista = document.getElementById("lista-de-tareas");

document.body.addEventListener("click", (event) =>{    

    if(event.target.getAttribute("id") === 'crear'){
        crearTarea();
    }

    else if(event.target.classList[0] === 'eliminar'){
        let elim = event.target.parentElement;        
        elim.remove(); 
    }

    else if(event.target.classList[0] === 'completar'){
        let div = event.target.parentElement; 
        let text = div.firstElementChild;          

        if(div.classList[0] === 'nuevaTarea'){            
            div.classList.remove("nuevaTarea");
            div.classList.add("tareaCompletada"); 
            text.classList.remove("textTarea");
            text.classList.add("textTareaCompletada");            
        }else{            
            div.classList.remove("tareaCompletada"); 
            div.classList.add("nuevaTarea");
            text.classList.remove("textTareaCompletada");
            text.classList.add("textTarea");            
        }             
    }
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
        let result = tarea.value.replace(spaceRegex, "");          
        tarea.value = "";
        
        const tareaNueva = document.createElement("div");
        tareaNueva.classList.add("nuevaTarea"); 
        lista.append(tareaNueva);
        
        const textoNuevo = document.createElement("p");
        textoNuevo.classList.add("textTarea"); 
        textoNuevo.textContent = result;   
        tareaNueva.append(textoNuevo);     
        
        const nuevoC = document.createElement("button");
        nuevoC.textContent = "✔️"; 
        nuevoC.classList.add("completar"); 
        tareaNueva.append(nuevoC);

        const nuevoE = document.createElement("button");
        nuevoE.textContent = "🗑️"; 
        nuevoE.classList.add("eliminar"); 
        tareaNueva.append(nuevoE);        
    }
}  