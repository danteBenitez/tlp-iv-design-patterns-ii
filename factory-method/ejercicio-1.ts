/*
    - **Ejercicio 1**: Crear Dispositivos de Entrada
    - **Objetivo**: Utilizar el patrón Factory Method para crear diferentes tipos de dispositivos de entrada.
    - Crear una clase DispositivoEntradaFactory con un método crearDispositivo que, basado en el tipo de dispositivo ("Teclado", "Ratón", "Scanner"), devuelva una instancia de la clase adecuada.
    - Crear clases específicas para cada tipo de dispositivo (Teclado, Ratón, Scanner), cada
        una con sus propias propiedades (Ej.: tipoConexion, marca).
    - Integrar la creación de estos dispositivos en el sistema de inventario.
*/

type TipoDispositivo = "Teclado" | "Ratón" | "Escáner";

class Dispositivo<TCaracteristicas extends Record<string, any> = Record<string, any>> {
    constructor(
        private tipo: TipoDispositivo,
        private caracteristicas: TCaracteristicas
    ) { }

    detalles() {
        return this.caracteristicas;
    }
}

type TipoTeclado = "membrana" | "mecánico"
type CaracteristicasTeclado = {
    marca: string,
    tipoTeclado: TipoTeclado
}

class Teclado extends Dispositivo<CaracteristicasTeclado> {
    private marca: string;
    private tipoTeclado: TipoTeclado;

    constructor(
        caracteristicas: CaracteristicasTeclado
    ) {
        super("Teclado", caracteristicas);
        this.marca = caracteristicas.marca;
        this.tipoTeclado = caracteristicas.tipoTeclado;
    }
}

type TipoMouse = "mecanico" | "laser" | "optico";
type CaracteristicasRaton = {
    marca: string,
    tipoMouse: TipoMouse,
    cableado: boolean
}

class Raton extends Dispositivo<CaracteristicasRaton> {
    private marca: string;
    private tipoMouse: TipoMouse;
    private cableado: boolean

    constructor(
        caracteristicas: CaracteristicasRaton
    ) {
        super("Ratón", caracteristicas);
        this.marca = caracteristicas.marca;
        this.tipoMouse = caracteristicas.tipoMouse;
        this.cableado = caracteristicas.cableado;
    }
}

// https://es.wikipedia.org/wiki/Esc%C3%A1ner_inform%C3%A1tico#Tipos
type TipoEscaner = "mano" | "cama plana" | "rotativo";
type CaracteristicasEscaner = {
    marca: string,
    tipoEscaner: TipoEscaner
}

class Escaner extends Dispositivo<CaracteristicasEscaner> {
    private marca: string
    private tipoEscaner: TipoEscaner

    constructor(
        caracteristicas: CaracteristicasEscaner
    ) {
        super("Escáner", caracteristicas);
        this.marca = caracteristicas.marca;
        this.tipoEscaner = caracteristicas.tipoEscaner;
    }
}

class DispositivoEntradaFactory {

    crearDispositivo(tipo: "Teclado", caracteristicas: CaracteristicasTeclado): Teclado
    crearDispositivo(tipo: "Ratón", caracteristicas: CaracteristicasRaton): Raton
    crearDispositivo(tipo: "Escáner", caracteristicas: CaracteristicasEscaner): Escaner
    crearDispositivo(tipo: string, caracteristicas: Record<string, any>): Dispositivo {
        if (tipo == "Teclado") {
            return new Teclado(caracteristicas as CaracteristicasTeclado);
        } else if (tipo == "Escáner") {
            return new Escaner(caracteristicas as CaracteristicasEscaner);
        } else if (tipo == "Ratón") {
            return new Raton(caracteristicas as CaracteristicasRaton);
        }
        throw new Error("Tipo de dispositivo inválido");
    }

}

const dispositivoFactory = new DispositivoEntradaFactory();

const teclado = dispositivoFactory.crearDispositivo("Teclado", {
    marca: "Redragon",
    tipoTeclado: "mecánico",
    // Intentar pasar una característica equivocada provoca un error
    // tipoEscaner: "cama plana"
});

console.log(teclado.detalles());