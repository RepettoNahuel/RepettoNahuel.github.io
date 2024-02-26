const recetas = document.querySelectorAll(".receta");

recetas.forEach((item) => {           
    /*Les selecciono la imagen de fondo segun el id*/
    item.style.background = "url(imagenes/" + item.getAttribute("id") + ".jpg) center/cover";

    /*Atiendo determinados eventos*/
    item.addEventListener("click", (evento)=>{
        let elemento = evento.target;

        while(elemento.classList[0] !== "receta"){
            elemento = elemento.parentElement;
        }

        elemento = elemento.lastElementChild;                           

        let elementStyle = window.getComputedStyle (elemento);
        let elementfontSize = elementStyle.getPropertyValue ('font-size');

        console.log(elementfontSize);

        if(elementfontSize === "0px"){
            elemento.style.fontSize = "1rem";
        }       
    });   
    
    item.addEventListener("mouseleave", (evento)=>{
        let elemento = evento.target.lastElementChild;                
        elemento.style.fontSize = "0px";              
    }); 
     
});
