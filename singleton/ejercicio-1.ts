/*
    - **Objetivo**: Implementar un patrón Singleton para gestionar la configuración global de la aplicación de inventario.
    - Crear una clase Configuracion que siga el patrón Singleton.
    - Esta clase debe almacenar propiedades como idioma, rutaBaseDatos y nivelRegistro.
    - Agregar métodos para obtener y actualizar cada una de estas propiedades.
    - Asegurar que solo exista una instancia de Configuracion en toda la aplicación.
*/

class Configuracion {
    private static instancia?: Configuracion;
    private idioma: string = "es";
    private rutaBaseDatos: string = process.env.DB_URL ?? "";
    private nivelRegistro: string = "log";

    private constructor() { };

    static obtenerInstancia(): Configuracion {
        if (Configuracion.instancia) {
            return Configuracion.instancia;
        }
        Configuracion.instancia = new Configuracion();
        return Configuracion.instancia;
    }

    obtenerIdioma() { return this.idioma; }
    establecerIdioma(idioma: string) {
        this.idioma = idioma;
    }

    obtenerRutaBaseDeDatos() { return this.rutaBaseDatos; }
    establecerRutaBaseDeDatos(ruta: string) {
        this.rutaBaseDatos = ruta;
    }

    obtenerNivelRegistro() { return this.nivelRegistro; }
    establecerNivelRegistro(nivel: string) {
        this.nivelRegistro = nivel;
    }
}

const config = Configuracion.obtenerInstancia();

console.log("Ruta de base de datos: ", config.obtenerRutaBaseDeDatos());

config.establecerRutaBaseDeDatos("postgres://localhost:5432");

console.log("Ruta de base de datos: ", config.obtenerRutaBaseDeDatos());

const config1 = Configuracion.obtenerInstancia();

console.assert(config == config1, "Sólo puede existir una instancia de Configuración");