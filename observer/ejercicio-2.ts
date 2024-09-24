/*
    - **Ejercicio 2**: Actualización de Inventario en Tiempo Real
    - **Objetivo**: Implementar el patrón Observer para actualizar en tiempo real la interfaz de usuario
    cuando se realicen cambios en el inventario.
    - Crear una clase InterfazUsuario que actúe como observador y actualice la visualización del inventario cuando se agreguen, eliminen o modifiquen equipos.
    - Modificar la clase Inventario para que permita agregar observadores y notifique a los
        observadores correspondientes cuando ocurra un cambio en la lista de equipos.
    - Asegurar que múltiples instancias de InterfazUsuario puedan recibir y manejar las
        notificaciones adecuadamente.
*/

import { EstadoEquipo, Observable, Observador } from "./ejercicio-1";

type EventoInventario = {
    equipo: Equipo,
    accion: "crear" | "modificar" | "eliminar"
}

export type TipoEquipo = "Servidor" | "Proyector" | "Impresora";

class Equipo {
    constructor(
        public nombre: string,
        public tipo: TipoEquipo,
        public estado: EstadoEquipo
    ) { }
}

export class Inventario implements Observable<EventoInventario> {
    private observadores: Observador<EventoInventario>[] = [];
    private equipos: Equipo[] = [];

    constructor() { }

    agregarEquipo(nombre: string, tipo: TipoEquipo, estado: EstadoEquipo) {
        const equipo = new Equipo(nombre, tipo, estado)
        this.equipos.push(equipo);
        this.notificar({
            accion: "crear",
            equipo: equipo
        });
    }


    removerEquipo(nombre: string) {
        const indice = this.equipos.findIndex(e => e.nombre == nombre);
        this.notificar({
            accion: "eliminar",
            equipo: this.equipos[indice]
        });
        this.equipos = this.equipos.splice(indice, 1);
    }

    modificarEquipo(nombre: string, datos: { nombre?: string, tipo?: TipoEquipo, estado?: EstadoEquipo }) {
        const indice = this.equipos.findIndex(e => e.nombre == nombre);
        this.notificar({
            accion: "modificar",
            equipo: this.equipos[indice]
        });
        const equipo = this.equipos[indice];
        this.equipos[indice] = new Equipo(datos.nombre ?? equipo.nombre, datos.tipo ?? equipo.tipo, datos.estado ?? equipo.estado);
    }

    listarEquipos() {
        return this.equipos.map(e => ({
            nombre: e.nombre,
            tipo: e.tipo,
            estado: e.estado
        }))
    }

    agregarObservador(o: Observador<EventoInventario>): void {
        this.observadores.push(o);
    }

    removerObservador(o: Observador<EventoInventario>): void {
        this.observadores = this.observadores.filter(ob => ob !== o);
    }

    notificar(body: EventoInventario): void {
        this.observadores.forEach(o => o.actualizar(body));
    }
}

class InterfazUsuario implements Observador<EventoInventario> {
    actualizar(body: EventoInventario): void {
        console.log("Actualizando interfaz de usuario...");
        console.log(`  Equipo ${body.equipo.nombre}, con tipo: ${body.equipo.tipo} y estado: ${body.equipo.tipo}`);
        console.log(`  Acción ${body.accion}`);
    }
}

const inventario = new Inventario();
const interfaz = new InterfazUsuario();

inventario.agregarObservador(interfaz);

inventario.agregarEquipo("Proyector Epson", "Proyector", "en reparación");

inventario.modificarEquipo("Proyector Epson", { estado: "disponible" });

inventario.removerEquipo("Proyector Epson");