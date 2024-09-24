/*
    - **Ejercicio 1**: Integrar Sistema de Facturación Antiguo
    - **Objetivo**: Implementar el patrón Adaptador para integrar un sistema antiguo de facturación con el nuevo sistema de inventario.
    - Crear una clase FacturacionVieja que tenga métodos como crearFactura y
        obtenerFactura.
    - Implementar una clase AdaptadorFacturacion que permita utilizar FacturacionVieja con
        la nueva interfaz IFacturacion, la cual requiere métodos como generarFactura y
        consultarFactura.
    - Asegurar que las facturas generadas a través del adaptador sean compatibles con el
        nuevo sistema de inventario.
*/

type FacturacionItem = { productoId: number, cantidad: number };

const DESCUENTO_POR_DEFECTO = 0.01;
const IMPUESTO_POR_DEFECTO = 0.2;


class Factura {
    public id: number
    private static ultimoId: number = 0;

    constructor(
        items: FacturacionItem[],
        descuento: number,
        impuesto: number,
    ) {
        this.id = Factura.ultimoId++;
    }
}

class FacturacionVieja {
    private facturas: Factura[] = [];

    crearFactura(items: FacturacionItem[]): Factura {
        const factura = new Factura(items, DESCUENTO_POR_DEFECTO, IMPUESTO_POR_DEFECTO);
        this.facturas.push(factura);
        return factura;
    }

    obtenerFactura(id: number): Factura | null {
        const factura = this.facturas.find(f => f.id == id)
        return factura ?? null;
    }
}

interface IFacturacion {
    generarFactura(items: FacturacionItem[]): Factura;
    consultarFactura(facturacionId: number): Factura | null;
}

class AdaptadorFacturacion implements IFacturacion {
    private facturacionVieja: FacturacionVieja = new FacturacionVieja();

    generarFactura(items: FacturacionItem[]): Factura {
        return this.facturacionVieja.crearFactura(items);
    }

    consultarFactura(facturaId: number): Factura | null {
        return this.facturacionVieja.obtenerFactura(facturaId);
    }
}

const adaptador = new AdaptadorFacturacion();
const factura = adaptador.generarFactura([
    {
        productoId: 1,
        cantidad: 10
    },
    {
        productoId: 2,
        cantidad: 5
    }
]);

console.assert(factura === adaptador.consultarFactura(factura.id));