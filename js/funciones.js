import { $btnAddRuta, $ruta,$tablaRutas,$btnClassAddList,$btnClassVerList, $modalTitle, $modalBody,$modalIdRuta,$modalNombre, $modalUrl, $btnAddPunto,$opcionesRuta,  $tdBotonesList ,$btnClassEditList,$btnClassDeleteList} from "./selectores.js";
import { Ruta, Rutas, Punto, Puntos} from "../Class/Rutas.js"
 
export const rutas = new Rutas();
export const puntos = new Puntos();

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
    colapsarPuntos();
}

function renderRutas(){
    let listaRutas = rutas.getRutas();
    $tablaRutas.innerHTML=" ";

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
                        <td class="tdOpciones hidden">
                            <button id="e${id}" type="button" class="btn btn-warning bi bi-pencil-square"></button>

                            <button id="d${id}" type="button" class="btn btn-danger bi bi-trash"></button>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" style="padding: 0;">
                            <div class="collapse" id="p${id}">
                            <div class="card-puntos" id="c${id}">
                            <!--Se añade de forma dinámica-->
                            </div>
                            </div>
                        </td>
                    </tr>`;

        $tablaRutas.insertAdjacentHTML('beforeend',html);
            
    });

}

function obtenerIndice(listaRutas,idRuta){
    let index;
    //Conocer el indice de la coincidencia
    listaRutas.forEach((e,i)=>{
        if(e.id == idRuta){
            return index = i;
        }
    });
    return index
}

export function funcionesPuntos(e){

    let idRuta= e.target.id;
    let listaRutas = rutas.getRutas();
    
    if(e.target.className.includes('addPunto')){
        let index = obtenerIndice(listaRutas,idRuta);
        $modalNombre.placeholder="Nombre del punto📍";
        $modalUrl.placeholder="URL de imagen";

        $modalTitle.textContent = listaRutas[index].nomRuta;
        $modalIdRuta.value = idRuta;
        
    }else if(e.target.className.includes('bi-eye')){
        renderPuntos(idRuta.slice(1)); //Elimina el primer carácter para solo tener el id identificador (ruta)

    }else if(e.target.className.includes('bi-pencil-square')){
        let index = obtenerIndice(listaRutas,idRuta.slice(1));
        editarRuta(index);
    }else if(e.target.className.includes('bi-trash')){
        eliminarRuta(index);
    }

}

export function renderPuntos(rutaId){
    let listaPuntos = puntos.getPuntos();

    //Conocer los indices que corresponden a la idRutas de cada punto
    let x =true;
    listaPuntos.forEach((e)=>{
        if(e.rutaId == rutaId){
            const $cardPuntos = document.getElementById(`c${rutaId}`);
            if(x){
                $cardPuntos.innerHTML=" ";
                x=false;
            }

            const {nomPuntos, imgURL} = e;

            let html = `<div class="card" style="width: 18rem;">
                            <img src="${imgURL}" class="card-img-top" alt="imagen.jpg">
                            <div class="card-body">
                            <p class="card-text"><b>${nomPuntos}</b></p>
                            <div>
                                <button type="button" class="btn btn-danger bi bi-trash3" id=""></button>
                            </div>
                            </div>
                        </div>`;
            
            $cardPuntos.insertAdjacentHTML('beforeend', html);
        }
    })
}

export function agregarPunto(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation(); 

    let nombrePunto =$modalNombre.value
    let imgPunto =  $modalUrl.value;
    let idPunto = Date.now();
    let rutaId = $modalIdRuta.value;
    //Construimos objeto del nuevo punto;

    let nuevoPunto = new Punto(idPunto,nombrePunto,rutaId,imgPunto);

    puntos.addPunto(nuevoPunto);

    renderPuntos(rutaId);
    $modalNombre.value="";
    $modalUrl.value="";

}

export function colapsarPuntos(){

    //Habilitar botones
    habilitarBtns(true);

    let listClass = document.getElementsByClassName('collapse');

    for (let i = 0; i < listClass.length; i++) {
        listClass[i].className = "collapse";
      }
   
}

function habilitarBtns(habilitar,deleteRuta){
    if(habilitar){
        $opcionesRuta.style.display='none';
        $btnAddRuta.disabled = false;
        $ruta.disabled = false;

        for (let i = 0; i < $btnClassAddList.length; i++) {

            $btnClassAddList[i].disabled = false;
            $btnClassAddList[i].style.color = 'green';
            
            $btnClassVerList[i].disabled = false;
            $btnClassVerList[i].style.color = 'rgb(6, 4, 97)'; 

            $tdBotonesList[i].style.display='none';

          }
    }else{
        $btnAddRuta.disabled = true;
        $ruta.disabled = true;


        if(deleteRuta){
        //Ocultamos el boton editar
        for (let i = 0; i < $btnClassAddList.length; i++) {
            $btnClassEditList[i].style.display='none';
            $btnClassDeleteList[i].style.display='flex';
            $btnClassDeleteList[i].style='justify-content:center';

          }
        }else{
            for (let i = 0; i < $btnClassAddList.length; i++) {
                $btnClassEditList[i].style.display='flex';
                $btnClassEditList[i].style='justify-content:center';
                $btnClassDeleteList[i].style.display='none';
              }
        }
        $opcionesRuta.style.display='table-cell';
        for (let i = 0; i < $btnClassAddList.length; i++) {
            $btnClassAddList[i].disabled = true;
            $btnClassAddList[i].style.color = 'gray';
            
            $btnClassVerList[i].disabled = true;
            $btnClassVerList[i].style.color = 'gray';   
            
            $tdBotonesList[i].style.display='table-cell';
          }
    }
}


export function editarRutas(){
    colapsarPuntos();
    console.log('editar checccck');
    $opcionesRuta.textContent='Editar';

    let deleteRuta = false;
    //Deshabilitando botones
    habilitarBtns(false, deleteRuta);

}


export function eliminarRutas(){
    colapsarPuntos();
    console.log('eliminaaar checccck')
    $opcionesRuta.textContent='Eliminar';
    let deleteRuta = true;
    //Deshabilitando botones
    habilitarBtns(false, deleteRuta);
    
}
function editarRuta(index){
    let listaRutas = rutas.getRutas();

    $btnAddRuta.disabled = false;
    $ruta.disabled = false;
    $ruta.value = listaRutas[index].nomRuta;

}

function eliminarRuta(index){
    rutas.removeRuta(index);
    renderPuntos();
    habilitarBtns(false, true);

}
