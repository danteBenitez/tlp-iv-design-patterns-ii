/*
    - **Ejercicio 2**: Fabricar Periféricos de Salida
    - **Objetivo**: Implementar el patrón Factory Method para crear diferentes periféricos de salida.
    - Crear una clase PerifericoSalidaFactory con un método crearPeriferico que, basado en el tipo ("Monitor", "Impresora", "Proyector"), devuelva una instancia de la clase correspondiente.
    - Crear clases específicas para cada tipo de periférico (Monitor, Impresora, Proyector), con propiedades particulares (Ej.: resolución para Monitor, tipoImpresión para Impresora).
    - Asegurar que el factory maneje correctamente la creación de cada periférico según el
        tipo especificado.
*/

type TipoPeriferico = "Monitor" | "Impresora" | "Proyector";

class PerifericoSalida<TCaracteristicas extends Record<string, any> = Record<string, any>> {
    constructor(
        private tipo: TipoPeriferico,
        private caracteristicas: TCaracteristicas
    ) { }

    detalles() {
        return { ...this.caracteristicas };
    }
}

type TipoMonitor = "LED" | "LCD";

type CaracteristicasMonitor = {
    resolucion: number,
    dimensiones: [number, number],
    tipoMonitor: TipoMonitor
}

class Monitor extends PerifericoSalida<CaracteristicasMonitor> {
    constructor(
        caracteristicas: CaracteristicasMonitor
    ) {
        super("Monitor", caracteristicas);
    }
}

type TipoImpresion = "láser" | "tinta";

type CaracteristicasImpresora = {
    tipoImpresion: TipoImpresion,
    aColor: boolean,
    cableado: boolean
}

class Impresora extends PerifericoSalida<CaracteristicasImpresora> {
    constructor(
        caracteristicas: CaracteristicasImpresora
    ) {
        super("Impresora", caracteristicas);
    }
}

type TipoConexion = "HDMI" | "USB" | "Inalámbrico";

type CaracteristicasProyector = {
    resolucion: number,
    conexion: TipoConexion
}

class Proyector extends PerifericoSalida<CaracteristicasProyector> {
    constructor(
        caracteristicas: CaracteristicasProyector
    ) {
        super("Proyector", caracteristicas);
    }
}

class PerifericoSalidaFactory {

    crearPeriferico(tipo: "Monitor", caracteristicas: CaracteristicasMonitor): Monitor
    crearPeriferico(tipo: "Impresora", caracteristicas: CaracteristicasImpresora): Impresora
    crearPeriferico(tipo: "Proyector", caracteristicas: CaracteristicasProyector): Proyector
    crearPeriferico(tipo: TipoPeriferico, caracteristicas: Record<string, any>): PerifericoSalida {
        if (tipo == "Impresora") {
            return new Impresora(caracteristicas as CaracteristicasImpresora);
        } else if (tipo == "Monitor") {
            return new Monitor(caracteristicas as CaracteristicasMonitor);
        } else if (tipo == "Proyector") {
            return new Proyector(caracteristicas as CaracteristicasProyector);
        } else {
            throw new Error("Tipo de periférico desconocido");
        }
    }
}

const factory = new PerifericoSalidaFactory();

const monitor = factory.crearPeriferico("Monitor", {
    resolucion: 1080,
    dimensiones: [800, 800],
    tipoMonitor: "LED"
});
console.log(monitor.detalles());

console.assert(monitor instanceof Monitor);

const impresora = factory.crearPeriferico("Impresora", {
    aColor: true,
    tipoImpresion: "láser",
    cableado: false
});

console.assert(impresora instanceof Impresora);

const proyector = factory.crearPeriferico("Proyector", {
    resolucion: 1080,
    conexion: "HDMI",
});

console.assert(proyector instanceof Proyector);