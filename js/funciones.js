import { $btnAddRuta, $ruta,$tablaRutas, $modalTitle, $modalBody,$modalIdRuta,$modalNombre, $modalUrl, $btnAddPunto} from "./selectores.js";
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
                        <div class="card-puntos" id="c${id}">
                        </div>
                        </div>
                    </td>
                </tr>`;

        $tablaRutas.insertAdjacentHTML('beforeend',html);
            
    });

}

export function funcionesPuntos(e){

    let id= e.target.id;
    console.log(id)
    let listaRutas = rutas.getRutas();
    let index;
    //Conocer el indice de la coincidencia
    listaRutas.forEach((e,i)=>{
        if(e.id == id){
            return index = i;
        }
    });

    if(e.target.className.includes('addPunto')){
        $modalNombre.placeholder="Nombre del punto📍";
        $modalUrl.placeholder="URL de imagen";

        $modalTitle.textContent = listaRutas[index].nomRuta;
        $modalIdRuta.value = id;
        
    }else if(e.target.className.includes('bi-eye')){

        renderPuntos(id.slice(1)); //Elimina el primer carácter para solo tener el id identificador (ruta)

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

    console.log("entramos al botonnn");
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

export function colapsarPuntos (){
    let prueba = document.getElementsByClassName('collapse');
    console.log(prueba)

    for (let i = 0; i < prueba.length; i++) {
        prueba[i].className = "collapse";
      }
   
}

