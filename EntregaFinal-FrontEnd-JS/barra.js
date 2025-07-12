/*Obtengo elementos del HTML*/
const menu1 = document.getElementById("menu1");
const menu2 = document.getElementById("menu2");

const nav = document.getElementById("nav");

let linea1 = document.getElementById("linea1");
let linea2 = document.getElementById("linea2");
let linea3 = document.getElementById("linea3");

let triangulo = document.getElementById("triangulo-img");

/*Control de eventos*/
document.body.addEventListener("click", (evento) => {
    let elemento = evento.target;
    let id = elemento.getAttribute("id");
    let ancestro = elemento.parentNode;
    let ancestroId = ancestro.getAttribute("id");

    if(id === "barras-menu-der" || ancestroId === "barras-menu-der"){

        if(menu1.classList.contains('cerrado')){
            menu1.classList.remove('cerrado');
            menu1.classList.add('abierto');        
            nav.style.alignItems = "flex-end";
            mostrarCarrito();
        }  
        else{
            menu1.classList.remove('abierto');
            menu1.classList.add('cerrado');        
            nav.style.alignItems = "center";
        }  
        
        triangulo.classList.toggle("girar");

        if(menu2.classList.contains('abierto')){
            menu2.classList.remove('abierto');
            menu2.classList.add('cerrado');  

            linea1.classList.toggle("activelinea1");
            linea2.classList.toggle("activelinea2");
            linea3.classList.toggle("activelinea3");
        }   
    }
    else if(id === "barras-menu-izq" || ancestroId === "barras-menu-izq"){

        if(menu2.classList.contains('cerrado')){
            menu2.classList.remove('cerrado');
            menu2.classList.add('abierto');        
            nav.style.alignItems = "flex-start";           
        }        
        else{
            menu2.classList.remove('abierto');
            menu2.classList.add('cerrado');        
            nav.style.alignItems = "center";
        }  

        linea1.classList.toggle("activelinea1");
        linea2.classList.toggle("activelinea2");
        linea3.classList.toggle("activelinea3"); 

        if(menu1.classList.contains('abierto')){
            menu1.classList.remove('abierto');
            menu1.classList.add('cerrado');  

            triangulo.classList.toggle("girar");
        }           
    }
    else{
        if(menu1.classList.contains('abierto')){
            menu1.classList.remove('abierto');
            menu1.classList.add('cerrado');  

            triangulo.classList.toggle("girar");
        }
        else if(menu2.classList.contains('abierto')){
            menu2.classList.remove('abierto');
            menu2.classList.add('cerrado');  

            linea1.classList.toggle("activelinea1");
            linea2.classList.toggle("activelinea2");
            linea3.classList.toggle("activelinea3");
        }
    } 
});