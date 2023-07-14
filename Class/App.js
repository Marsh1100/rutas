import { $navRutas,$navNuevaRuta ,$btnAddRuta, $ruta , $tablaRutas,$btnAddPunto} from "../js/selectores.js";
import {agregarRuta,rutas, funcionesPuntos,agregarPunto,renderPuntos,colapsarPuntos} from "../js/funciones.js"


export class App {
    constructor(){
        this.initProgram();
    }

    initProgram(){
        $navRutas.addEventListener('click',colapsarPuntos)
        $navNuevaRuta.addEventListener('click',colapsarPuntos);
        
        $btnAddRuta.addEventListener('click',agregarRuta);
        //console.log(rutas.getRutas());
        $tablaRutas.addEventListener('click',funcionesPuntos);
        $btnAddPunto.addEventListener('click',agregarPunto);
        
        const listaRutas = rutas.getRutas();

        listaRutas.forEach(e =>{

            renderPuntos(e.id);
        })
        
    }
}