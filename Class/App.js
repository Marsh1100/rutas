import { $navRutas,$navNuevaRuta,$navEditarRutas,$navEliminarRutas,$btnAddRuta, $ruta , $tablaRutas,$btnAddPunto} from "../js/selectores.js";
import {colapsarPuntos,editarRutas,eliminarRutas,agregarRuta,rutas, funcionesPuntos,agregarPunto,renderPuntos} from "../js/funciones.js"


export class App {
    constructor(){
        this.initProgram();
    }

    initProgram(){
        const listaRutas = rutas.getRutas();
        listaRutas.forEach(e =>{
            renderPuntos(e.id);
        });

        $navRutas.addEventListener('click',colapsarPuntos)
        $navNuevaRuta.addEventListener('click',colapsarPuntos);
        $navEditarRutas.addEventListener('click',editarRutas);
        $navEliminarRutas.addEventListener('click',eliminarRutas);

        $btnAddRuta.addEventListener('click',agregarRuta);
        //console.log(rutas.getRutas());
        $tablaRutas.addEventListener('click',funcionesPuntos);
        $btnAddPunto.addEventListener('click',agregarPunto);
        

    }
}