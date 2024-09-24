# Ejercicio de patrones de diseño

## Patrón Singleton

- **Ejercicio 1**: Gestionar Configuración Global del Sistema
- **Objetivo**: Implementar un patrón Singleton para gestionar la configuración global de la aplicación de inventario.

  - Crear una clase Configuracion que siga el patrón Singleton.
  - Esta clase debe almacenar propiedades como idioma, rutaBaseDatos y nivelRegistro.
  - Agregar métodos para obtener y actualizar cada una de estas propiedades.
  - Asegurar que solo exista una instancia de Configuracion en toda la aplicación.

- **Ejercicio 2**: Control de Conexiones a la Base de Datos
- **Objetivo**: Utilizar el patrón Singleton para manejar la conexión a la base de datos de inventario.
  - Crear una clase ConexionDB que siga el patrón Singleton.
  - Esta clase debe manejar la conexión a una base de datos ficticia, con propiedades como host, puerto y usuario.
  - Implementar métodos para conectar y desconectar la base de datos.
  - Garantizar que todas las partes de la aplicación utilicen la misma instancia de ConexionDB.

## Patrón Factory Method

- **Ejercicio 1**: Crear Dispositivos de Entrada
- **Objetivo**: Utilizar el patrón Factory Method para crear diferentes tipos de dispositivos de entrada.

  - Crear una clase DispositivoEntradaFactory con un método crearDispositivo que, basado en el tipo de dispositivo ("Teclado", "Ratón", "Scanner"), devuelva una instancia de la clase adecuada.
  - Crear clases específicas para cada tipo de dispositivo (Teclado, Ratón, Scanner), cada
    una con sus propias propiedades (Ej.: tipoConexion, marca).
  - Integrar la creación de estos dispositivos en el sistema de inventario.

- **Ejercicio 2**: Fabricar Periféricos de Salida
- **Objetivo**: Implementar el patrón Factory Method para crear diferentes periféricos de salida.
  - Crear una clase PerifericoSalidaFactory con un método crearPeriferico que, basado en el tipo ("Monitor", "Impresora", "Proyector"), devuelva una instancia de la clase correspondiente.
  - Crear clases específicas para cada tipo de periférico (Monitor, Impresora, Proyector), con propiedades particulares (Ej.: resolución para Monitor, tipoImpresión para Impresora).
  - Asegurar que el factory maneje correctamente la creación de cada periférico según el
    tipo especificado.

## Patrón Observer

- **Ejercicio 1**: Notificación de Mantenimiento Preventivo
- **Objetivo**: Utilizar el patrón Observer para notificar al departamento de mantenimiento cuando un equipo alcanza un cierto tiempo de uso.

  - Crear una clase DepartamentoMantenimiento que actúe como observador y reciba
    notificaciones cuando un equipo necesite mantenimiento preventivo.
  - Implementar la clase Equipo que permita agregar observadores y notifique a los
    observadores cuando su tiempo de uso alcance un umbral definido.
  - Definir propiedades como nombre, tipo, estado y tiempoUso en la clase Equipo.

- **Ejercicio 2**: Actualización de Inventario en Tiempo Real
- **Objetivo**: Implementar el patrón Observer para actualizar en tiempo real la interfaz de usuario
  cuando se realicen cambios en el inventario.
  - Crear una clase InterfazUsuario que actúe como observador y actualice la visualización del inventario cuando se agreguen, eliminen o modifiquen equipos.
  - Modificar la clase Inventario para que permita agregar observadores y notifique a los
    observadores correspondientes cuando ocurra un cambio en la lista de equipos.
  - Asegurar que múltiples instancias de InterfazUsuario puedan recibir y manejar las
    notificaciones adecuadamente.

## Patrón Adaptador

- **Ejercicio 1**: Integrar Sistema de Facturación Antiguo
- **Objetivo**: Implementar el patrón Adaptador para integrar un sistema antiguo de facturación con el nuevo sistema de inventario.

  - Crear una clase FacturacionVieja que tenga métodos como crearFactura y
    obtenerFactura.
  - Implementar una clase AdaptadorFacturacion que permita utilizar FacturacionVieja con
    la nueva interfaz IFacturacion, la cual requiere métodos como generarFactura y
    consultarFactura.
  - Asegurar que las facturas generadas a través del adaptador sean compatibles con el
    nuevo sistema de inventario.

- **Ejercicio 2**: Compatibilidad con APIs Externas
- **Objetivo**: Utilizar el patrón Adaptador para integrar una API externa de proveedores con el
  sistema de inventario existente.
  - Crear una clase ProveedorExternoAPI que ofrezca métodos como fetchProductos y
    updateStock.
  - Implementar una clase AdaptadorProveedor que permita utilizar ProveedorExternoAPI
    con la interfaz IProveedor, que requiere métodos como obtenerProductos y
    actualizarInventario.
  - Asegurar que los datos obtenidos de la API externa se adapten correctamente al
    formato requerido por el sistema de inventario.
