class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;// Almacena el elemento del DOM para mostrar el valor actual
        this.displayValorAnterior = displayValorAnterior;// Almacena el elemento del DOM para mostrar el valor anterior
        this.calculador = new Calculadora();// Crea una instancia de la clase Calculadora
        this.tipoOperacion = undefined;// Inicializa el tipo de operación como indefinido
        this.valorActual = '';// Inicializa el valor actual como una cadena vacía
        this.valorAnterior = '';// Inicializa el valor anterior como una cadena vacía
        this.signos = {// Define los símbolos para las operaciones
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);// Elimina el último carácter del valor actual
        this.imprimirValores();// Actualiza los valores mostrados en pantalla
    }

    borrarTodo() { 
        this.valorActual = ''; // Resetea el valor actual
        this.valorAnterior = ''; // Resetea el valor anterior
        this.tipoOperacion = undefined; // Resetea el tipo de operación
        this.imprimirValores(); // Actualiza los valores mostrados en pantalla
    }

    
    computar(tipo) { 
        this.tipoOperacion !== 'igual' && this.calcular(); // Si la operación no es 'igual', realiza el cálculo
        this.tipoOperacion = tipo; // Establece el tipo de operación actual
        this.valorAnterior = this.valorActual || this.valorAnterior; // Establece el valor anterior al valor actual o mantiene el valor anterior si el valor actual está vacío
        this.valorActual = ''; // Resetea el valor actual
        this.imprimirValores(); // Actualiza los valores mostrados en pantalla
    }
    agregarNumero(numero) { 
        if(numero === '.' && this.valorActual.includes('.')) return // Evita agregar más de un punto decimal
        this.valorActual = this.valorActual.toString() + numero.toString(); // Agrega el número al valor actual
        this.imprimirValores(); // Actualiza los valores mostrados en pantalla
    }

    imprimirValores() { 
        this.displayValorActual.textContent = this.valorActual; // Muestra el valor actual en el display
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`; // Muestra el valor anterior y el tipo de operación en el display
    }

    calcular() { 
        const valorAnterior = parseFloat(this.valorAnterior); // Convierte el valor anterior a un número
        const valorActual = parseFloat(this.valorActual); // Convierte el valor actual a un número

        if( isNaN(valorActual)  || isNaN(valorAnterior) ) return // Si alguno de los valores no es un número, termina la función
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual); // Realiza la operación usando el método correspondiente de la calculadora
    }
}
