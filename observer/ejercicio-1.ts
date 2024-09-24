/*
    - **Ejercicio 1**: Notificación de Mantenimiento Preventivo
    - **Objetivo**: Utilizar el patrón Observer para notificar al departamento de mantenimiento cuando un equipo alcanza un cierto tiempo de uso.
    - Crear una clase DepartamentoMantenimiento que actúe como observador y reciba
        notificaciones cuando un equipo necesite mantenimiento preventivo.
    - Implementar la clase Equipo que permita agregar observadores y notifique a los
        observadores cuando su tiempo de uso alcance un umbral definido.
    - Definir propiedades como nombre, tipo, estado y tiempoUso en la clase Equipo.
 */

const UMBRAL_TIEMPO_USO = 200;

export type EstadoEquipo = "disponible" | "en reparación";


export class Equipo implements Observable<EventoTiempoUso> {
    private observadores: Observador<EventoTiempoUso>[] = [];

    constructor(
        public nombre: string,
        public tipo: string,
        public estado: EstadoEquipo,
        private tiempoUso: number,
    ) { }

    agregarObservador(o: Observador<EventoTiempoUso>): void {
        this.observadores.push(o);
    }

    notificar(body: EventoTiempoUso): void {
        this.observadores.forEach(o => o.actualizar(body));
    }

    removerObservador(o: Observador<EventoTiempoUso>): void {
        this.observadores = this.observadores.filter(ob => ob !== o);
    }

    establecerTiempoUso(tiempoUso: number) {
        if (tiempoUso >= UMBRAL_TIEMPO_USO) {
            this.notificar({
                tiempoUsoAlcanzadoDias: tiempoUso,
                equipo: this
            });
        }
        this.tiempoUso = tiempoUso;
    }
}

type EventoTiempoUso = {
    tiempoUsoAlcanzadoDias: number,
    equipo: Equipo
};

export interface Observable<TPayload = never> {
    notificar(body: TPayload): void;
    agregarObservador(o: Observador<TPayload>): void;
    removerObservador(o: Observador<TPayload>): void;
}

export interface Observador<TPayload = never> {
    actualizar(body: TPayload): void;
}

class DepartamentoMantenimiento implements Observador<EventoTiempoUso> {
    actualizar(e: EventoTiempoUso) {
        console.log(`El equipo ${e.equipo.nombre} ha alcanzado ${e.tiempoUsoAlcanzadoDias} días en uso`);
    }
}

const departamento = new DepartamentoMantenimiento();
const equipo = new Equipo("Impresora HP", "Impresora", "disponible", 199);
equipo.agregarObservador(departamento);

equipo.establecerTiempoUso(200);