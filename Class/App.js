import { $btnAddRuta, $ruta , $tablaRutas,$btnAddPunto} from "../js/selectores.js";
import {agregarRuta,rutas, funcionesPuntos} from "../js/funciones.js"


export class App {
    constructor(){
        this.initProgram();
    }

    initProgram(){
        $btnAddRuta.addEventListener('click',agregarRuta);
        console.log(rutas.getRutas())
        $tablaRutas.addEventListener('click',funcionesPuntos);
        $btnAddPunto.addEventListener('click',agregarPunto)
    }
}