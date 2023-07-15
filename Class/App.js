import { $navRutas,$navNuevaRuta,$navEditarRutas,$navEliminarRutas,$btnAddRuta, $ruta , $tablaRutas,$btnAddPunto} from "../js/selectores.js";
import {tablaRutas,nuevaRuta,editarRutas,eliminarRutas,agregarRuta,rutas, funcionesPuntos,agregarPunto,renderPuntos,puntos} from "../js/funciones.js"


export class App {
    constructor(){
        this.initProgram();
    }

    initProgram(){
        console.log(puntos)
        const listaRutas = rutas.getRutas();
        listaRutas.forEach(e =>{
            renderPuntos(e.id);
        });

        $navRutas.addEventListener('click',tablaRutas)
        $navNuevaRuta.addEventListener('click',nuevaRuta);
        $navEditarRutas.addEventListener('click',editarRutas);
        $navEliminarRutas.addEventListener('click',eliminarRutas);

        $btnAddRuta.addEventListener('click',agregarRuta);
        //console.log(rutas.getRutas());
        $tablaRutas.addEventListener('click',funcionesPuntos);
        $btnAddPunto.addEventListener('click',agregarPunto);
        

    }
}