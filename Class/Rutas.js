
export class Ruta {
    constructor(id,nomRuta){
        this.id=id;
        this.nomRuta=nomRuta;
    }
}

export class Rutas {
    constructor(){
        this.rutas = [];
    }

    addRuta(ruta){
        this.rutas.push(ruta)
    }

    editRuta(index,ruta){
        this.rutas.splice(index,1,ruta);
    }

    removeRuta(index){
        this.carrito.splice(index,1);
    }

    getRutas(){
        return this.rutas
    }

}

export class Punto{
    constructor(id,nomPuntos,rutaId,imgURL){
        this.id=id;
        this.nomPuntos=nomPuntos;
        this.rutaId=rutaId;
        this.imgURL=imgURL;
    }
}

export class Puntos{
    constructor() {
        this.puntos=[];
    }

    addPunto(punto){
        this.puntos.push(punto)
    }

    removePunto(index){
        this.carrito.splice(index,1);
    }

    getPuntos(){
        return this.puntos
    }
}