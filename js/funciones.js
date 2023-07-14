import { $btnAddRuta, $ruta,$tablaRutas, $modalTitle, $modalBody,$modalIdRuta,$modalNombre, $modalUrl, $btnAddPunto} from "./selectores.js";
import { Ruta, Rutas} from "../Class/Rutas.js"
 
export const rutas = new Rutas();

export function agregarRuta(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation();     
    
    //Creación de objeto ruta
    console.log($ruta.value);
    let id = Date.now()
    let nombreRuta = $ruta.value;

    let nuevaRuta = new Ruta(id,nombreRuta);
    rutas.addRuta(nuevaRuta)

    $ruta.value=" ";
    
    renderRutas();
}

function renderRutas(){
    let listaRutas = rutas.getRutas();
    $tablaRutas.innerHTML=" ";

    let prueba = [1,2,3,4,5,6,7,7]
    let prueba2 = []
    let p = []


    listaRutas.forEach((ruta,index)=>{
        const {id,nomRuta} = ruta;
        let html = `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${nomRuta}</td>
                    <td>
                        <button id="${id}" type="button" class="addPunto bi bi-plus-square" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                    </td>
                    <td>0</td>
                    <td>
                        <button  id="v${id}" data-bs-target="#p${id}" type="button" class="bi bi-eye" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample"></button>
                    </td>

                    </tr>

                    <tr>
                    <td colspan="5" style="padding: 0;">
                        <div class="collapse" id="p${id}">
                        <div>
                            ${ !p ? prueba2: prueba }
                        </div>
                        </div>
                    </td>
                </tr>`;

        $tablaRutas.insertAdjacentHTML('beforeend',html);
            
    });

}

export function funcionesPuntos(e){
    let id= e.target.id;

    let listaRutas = rutas.getRutas();
    let index;
    //Conocer el indice de la coincidencia
    listaRutas.forEach((e,i)=>{
        if(e.id == id){
            return index = i;
        }
    });

    if(e.target.className.includes('addPunto')){
        $modalTitle.textContent = listaRutas[index].nomRuta;
        $modalIdRuta.placeholder = listaRutas[index].id;
    }else if(e.target.className.includes('bi-eye')){
        renderPuntos();
    }

}

export function agregarPunto(){

}