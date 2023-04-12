//function

function mostrarLista(miLista){
    if(miLista.length == 0){
        return "lista vacia"
    }
    miLista.forEach((element) => {
        console.log(element);
    });
    return `mi lista tiene: ${miLista.length}`;
}

console.log();(mostrarLista(["gaston","ignacio","julieta"]));
console.log(mostrarLista([]));

//class

class Contador {
    static contadorGlobal = 0;
    constructor(nombre) {
        this.resposable = nombre;
        this.contador = 0;
    }
    getResponsable() {
        return this.resposable;
    }
    
    contar() {
        this.contador++;
        Contador.contadorGlobal++;
    }
    getCuentaIndividual(){
        return this.contador;
    }
    getCuentaGlobal(){
        return Contador.contadorGlobal; 
    }
    }


const contador1 = new Contador("Eze");
contador1.contar()
const contador2 = new Contador("Gasti")
contador2.contar()
contador2.contar()

console.log(contador1.getCuentaGlobal())
console.log(contador2.getCuentaGlobal())
console.log(contador2.getCuentaIndividual())
console.log(contador1.getCuentaIndividual())



