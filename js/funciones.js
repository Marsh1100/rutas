import { $formRuta, $ruta } from "./selectores";


$formRuta.addEventListener('submit',agregarRuta);

function agregarRuta(e){
    e.preventDefault(); // Evitar el envío del formulario

     //Creación de objeto ruta
     console.log($ruta.value)
}