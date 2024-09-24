/*
    - **Ejercicio 2**: Control de Conexiones a la Base de Datos
    - **Objetivo**: Utilizar el patrón Singleton para manejar la conexión a la base de datos de inventario.
    - Crear una clase ConexionDB que siga el patrón Singleton.
    - Esta clase debe manejar la conexión a una base de datos ficticia, con propiedades como host, puerto y usuario.
    - Implementar métodos para conectar y desconectar la base de datos.
    - Garantizar que todas las partes de la aplicación utilicen la misma instancia de ConexionDB.
*/

class ConexionDB {
    private static instancia?: ConexionDB;
    private host: string = "localhost"
    private puerto: number = 5432
    private usuario: string = "root"
    private contrasenia: string = "root"

    private conectado: boolean = false

    private constructor() { }

    static obtenerInstancia() {
        if (!ConexionDB.instancia) {
            ConexionDB.instancia = new ConexionDB()
        }
        return ConexionDB.instancia;
    }

    conectar() {
        console.log("Conectando base de datos con opciones: ", {
            usuario: this.usuario,
            puerto: this.puerto,
            contrasenia: this.contrasenia,
            host: this.host
        });
        this.conectado = true;
    }

    desconectar() {
        if (!this.conectado) {
            throw new Error("Se llamó desconectar() sin conectar() antes");
        }
        console.log("Desconectando base de datos con opciones...");
        this.conectado = false;
    }
}

const conexion = ConexionDB.obtenerInstancia();

conexion.conectar();

conexion.desconectar();

const conexion1 = ConexionDB.obtenerInstancia();

// Lo siguiente termina en un error, puesto que la instancia de conexión es la misma
// conexion.desconectar();
