import {$secInicio,$secRutas,$formAddRuta, $btnAddRuta,$subTitle, $ruta,$tablaRutas,$cartsPuntosList,$btnClassAddList,$btnClassVerList, $modalTitle, $modalBody,$modalIdRuta,$modalNombre, $modalUrl, $btnAddPunto,$opcionesRuta,  $tdBotonesList ,$btnClassEditList,$btnClassDeleteList} from "./selectores.js";
import { Ruta, Rutas, Punto, Puntos} from "../Class/Rutas.js"
 
export const rutas = new Rutas();
export const puntos = new Puntos();

export function agregarRuta(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation();     
    
    let nombreRuta = $ruta.value;

    if($btnAddRuta.textContent == 'Guardar'){
         //Creación de objeto ruta
        let id = Date.now()
        let nuevaRuta = new Ruta(id,nombreRuta);
        rutas.addRuta(nuevaRuta);

    }else{ //Edición de la ruta
        let listaRutas = rutas.getRutas();
        let idRuta = e.target.value;

        let index = obtenerIndice(listaRutas,idRuta)

        let edicionRuta = new Ruta(idRuta,nombreRuta);
        rutas.editRuta(index,edicionRuta);
        $btnAddRuta.innerHTML = 'Guardar';
    }

    $ruta.value=" ";
    renderRutas();

    colapsarPuntos();
}

function contarPuntos(id){
    let contador = 0;
    let listaPuntos = puntos.getPuntos();

    listaPuntos.forEach(punto=>{
        if(punto.rutaId === id){
            contador +=1;
        }
       
    });

    return contador
}
function renderRutas(){
    
    let listaRutas = rutas.getRutas();
    $tablaRutas.innerHTML=" ";

    listaRutas.forEach((ruta,index)=>{
        const {id,nomRuta} = ruta;
        let contadorPuntos = contarPuntos(id); //Contar los puntos de cada RUTA
        let html = `<tr>
                        <th scope="row">${index+1}</th>
                        <td>${nomRuta}</td>
                        <td>
                            <button id="${id}" type="button" class="addPunto bi bi-plus-square" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>
                        </td>
                        <td id="${id}p">${contadorPuntos}</td>
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
                                <div class="cardPuntos" id="c${id}">
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
    if(isNaN(idRuta[0])){//Elimina el primer carácter para solo tener el id identificador (ruta) 
        idRuta = idRuta.slice(1);
    }
    //Conocer el indice de la coincidencia
    listaRutas.forEach((e,i)=>{
        if(e.id == idRuta){
            return index = i;
        }
    });
    return index
}

export function funcionesPuntos(e){
    let clases = e.target.className;
    let idRuta= e.target.id;
    let listaRutas = rutas.getRutas();
    let index = obtenerIndice(listaRutas,idRuta);
    
    if(clases.includes('addPunto')){
        $modalNombre.placeholder="Nombre del punto📍";
        $modalUrl.placeholder="URL de imagen";

        $modalTitle.textContent = listaRutas[index].nomRuta;
        $modalIdRuta.value = idRuta;
        
    }else if(clases.includes('bi-eye')){
        renderPuntos(idRuta); 

    }else if(clases.includes('bi-pencil-square')){
        editarRuta(index);
    }else if(clases.includes('bi-trash')){

        if(!clases.includes('rutas')){
            eliminarRuta(index,Number(idRuta.slice(1)));
        }else{
            console.log(e.target.id)
        }
    }

}

export function renderPuntos(idRuta){
    let listaPuntos = puntos.getPuntos();
    //Conocer los indices que corresponden a la idRutas de cada punto
    let x =true;
    listaPuntos.forEach((e)=>{
        if(e.rutaId == idRuta){
            const $cardPuntos = document.getElementById(`c${idRuta}`);
            if(x){
                $cardPuntos.innerHTML=" ";
                x=false;
            }

            const {id,nomPuntos, imgURL} = e;

            let html = `<div class="card" style="width: 18rem;">
                            <img src="${imgURL}" class="card-img-top" alt="imagen.jpg">
                            <div class="card-body">
                            <p class="card-text"><b>${nomPuntos}</b></p>
                            <div>
                                <button type="button" class="btn btn-danger bi bi-trash rutas" id="${id}"></button>
                            </div>
                            </div>
                        </div>`;
            
            $cardPuntos.insertAdjacentHTML('beforeend', html);
        }
    });

}

export function agregarPunto(e){
    e.preventDefault(); // Evitar el envío del formulario
    e.stopPropagation(); 

    let nombrePunto =$modalNombre.value
    let imgPunto =  $modalUrl.value;
    let idPunto = Date.now();
    let rutaId = Number($modalIdRuta.value);
    //Construimos objeto del nuevo punto;

    let nuevoPunto = new Punto(idPunto,nombrePunto,rutaId,imgPunto);

    puntos.addPunto(nuevoPunto);

    document.getElementById(`${rutaId}p`).textContent =  contarPuntos(rutaId);    $modalNombre.value="";
    $modalUrl.value="";

}
export function tablaRutas(){
    $secInicio.style.display="none";
    $formAddRuta.style.display="none";

    $subTitle.textContent="Lista de rutas"
    $secRutas.style.display="flex";

    colapsarPuntos();
}

export function nuevaRuta(){
    $secInicio.style.display="none";
    $formAddRuta.style.display="flex";

    $subTitle.textContent="Agregar nueva Ruta";
    $secRutas.style.display="flex";

    $ruta.placeholder="Nueva Ruta";

    colapsarPuntos();
}
export function colapsarPuntos(e){
   
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
            let idRuta = $cartsPuntosList[i].id.slice(1);
            renderPuntos(idRuta)
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


export function editarRutas(){//Nav editar
    colapsarPuntos();
    console.log('editar checccck');
    $opcionesRuta.textContent='Editar';

    let deleteRuta = false;
    //Deshabilitando botones
    habilitarBtns(false, deleteRuta);

}


export function eliminarRutas(){ //Nav eliminar
    colapsarPuntos();
    $opcionesRuta.textContent='Eliminar';
    let deleteRuta = true;
    //Deshabilitando botones
    habilitarBtns(false, deleteRuta);
    
}
function editarRuta(index){
    let listaRutas = rutas.getRutas();
    console.log(index)

    $btnAddRuta.innerHTML = "Editar";
    $btnAddRuta.setAttribute("value",listaRutas[index].id )

    $btnAddRuta.disabled = false;
    $ruta.disabled = false;
    $ruta.value = listaRutas[index].nomRuta;


    habilitarBtns(false,false);

}

function eliminarRuta(indexR, idRuta){
    rutas.removeRuta(indexR);

    let listaPuntos = puntos.getPuntos();
    listaPuntos.forEach((punto,index) =>{
        console.log(punto.rutaId, idRuta, "igualar")
        if(punto.rutaId === idRuta){
            puntos.removePunto(punto.id);
        }else{
            console.log(index)
        }
    });

    console.log(puntos.getPuntos());
    renderRutas();
    habilitarBtns(false,true);
}
