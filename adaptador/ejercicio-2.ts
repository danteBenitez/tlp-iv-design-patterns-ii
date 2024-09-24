/*
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
*/

class Producto {
    constructor(
        public productId: number,
        private nombre: string,
        private precio: number,
        public stock: number
    ) { }


    obtenerNombre() {
        return this.nombre;
    }
}

class ProveedorExternoAPI {
    private productos: Producto[] = [
        new Producto(1, "Proyector Epson", 290.0, 2),
        new Producto(2, "Impresora HP", 32.0, 3),
        new Producto(3, "Servidor", 89.0, 4),
    ];

    async fetchProductos(): Promise<Producto[]> {
        console.log("Obteniendo productos de API externa");
        return this.productos;
    }

    async updateStock(productoId: number, stock: number): Promise<void> {
        console.log("Actualizando stock con API externa");
        const producto = this.productos.find(p => p.productId === productoId);
        if (!producto) return;
        producto.stock = stock;
    }
}

interface IProveedor {
    obtenerProductos(): Promise<Producto[]>
    actualizarInventario(productId: number, stock: number): Promise<void>
}

class AdaptadorProveedor implements IProveedor {
    private proveedor: ProveedorExternoAPI = new ProveedorExternoAPI()

    actualizarInventario(productId: number, stock: number): Promise<void> {
        return this.proveedor.updateStock(productId, stock);
    }

    obtenerProductos(): Promise<Producto[]> {
        return this.proveedor.fetchProductos();
    }
}

async function main() {
    const adaptador = new AdaptadorProveedor();
    const productos = await adaptador.obtenerProductos();
    console.log("Obtenidos productos...", productos);
    const stockAnterior = productos[0].stock;
    await adaptador.actualizarInventario(productos[0].productId, 100);
    console.log(`Actualizado stock de producto ${productos[0].obtenerNombre()} de ${stockAnterior} a ${productos[0].stock}`,);
}

main();

