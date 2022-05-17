


const carro = new Carrito();

const carrito = document.getElementById('carrito');

const productos = document.getElementById('lista-productos');

const listaProductos = document.querySelector('#carritoLista tbody');

const limpiarCarritoBtn = document.getElementById('limpiarcarrito');





cargaDeEventosCarrito();

function cargaDeEventosCarrito(){

    //agregar al carrito
    productos.addEventListener('click', (e)=>{carro.agregarProducto(e)});

    
    //elimina elementos del carrito
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    
    //limpia carrito
    limpiarCarritoBtn.addEventListener('click', (e)=>{carro.limpiarCarrito(e)});

    
    //Para mostrar lo guardado en Local Storage
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    
}