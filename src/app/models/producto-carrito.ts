export class ProductoCarrito {

    constructor(
        public _id: String,
        public cveproducto: String,
        public descripcion_corta: String,
        public dscproducto: String,
        public cedis: String,
        public precio_lista: any,
        public precio_final: any,
        public img1: Array<any>,
        public piezas: any
    ){}

}