export class Producto{
    constructor(
        public _id: String,
        public cveproducto: String,
        public descripcion_corta: String,
        public dscproducto: String,
        public precio_lista: any,
        public img1: Array<any>,
        public img2: Array<any>,
        public img3: Array<any>,
        public img4: Array<any>,
        public pdf: String,
        public categoria: String,
        public subcategoria: String,
        public items: any,
        public cedis: String,
        public existencias: any,
        public precio_final: any,
        public descuento_porcentaje: any,
        public descuento_fecha_inicio: String,
        public descuento_fecha_fin: String
    ){}

}