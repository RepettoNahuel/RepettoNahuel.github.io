/*Los files que contiene una clase por convencion inician sus nombre con mayuscula*/

class Pantalla {
    constructor(resultadoEnPantalla, ingresoEnPantalla) {
        this.ingresoEnPantalla = ingresoEnPantalla;
        this.resultadoEnPantalla = resultadoEnPantalla;
        this.tipoOperacion = undefined;
        this.ingreso = '';
        this.resultado = '';
        this.signos = {
            sumar: '+',
            dividir: '/',
            multiplicar: '*',
            restar: '-', 
        }
    }

    imprimirValores() {                                             /*seteamos lo que diga dentro del html*/
        this.ingresoEnPantalla.textContent = this.ingreso; 
        this.resultadoEnPantalla.textContent = `${this.resultado} ${this.signos[this.tipoOperacion] || ''}`;
    }

    borrarTodo() {
        this.ingreso = '';
        this.resultado = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }
    
    borrar() {
        this.ingreso = this.ingreso.toString().slice(0,-1); /*tomo todo el numero menos el ultimo digito*/
        this.imprimirValores();
    }
   
    computar(tipo) {
        if(this.tipoOperacion !== 'igual' ) this.calcular();
        this.tipoOperacion = tipo;
        this.resultado = this.ingreso || this.resultado;
        this.ingreso = '';
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.ingreso.includes('.')) return /*si se ingresa un segundo . que no lo registre*/
        this.ingreso = this.ingreso.toString() + numero.toString();
        this.imprimirValores();
    }
    
    calcular() {
        const resultado = parseFloat(this.resultado);
        const ingreso = parseFloat(this.ingreso);

        if( isNaN(ingreso)  || isNaN(resultado) ) return /*si algun operando no es un numero no debe relizar el calculo*/
                
        switch(this.tipoOperacion){
            case 'sumar':
                this.ingreso = resultado + ingreso;
                break;

            case 'restar':
                this.ingreso = resultado - ingreso;
                break;
            
            case 'dividir':
                this.ingreso = resultado / ingreso;
                break;
        
            case 'multiplicar':
                this.ingreso = resultado * ingreso;
                break;
        }              
    }
}
