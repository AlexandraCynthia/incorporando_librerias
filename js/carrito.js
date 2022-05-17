



class Carrito {

    //Agregar un producto al carrito
    agregarProducto(e){
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.verificarDatosProducto(producto);
        }
    }



    //selecciona la información de cada item
    verificarDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
            }

        
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){

             
                productosLS = productoLS.id;
            }
        });
        
        if(productosLS === infoProducto.id){

        //USANDO SWEAT ALERT PARA INDICAR QUE EL PRODUCTO YA ESTA AGREGADO

         Swal.fire({
              title: 'El producto ya ha sido agregado',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })

        }
        else {
            this.insertarCarrito(infoProducto);
        }
        
    }




    //Mostrará lo seleccionado en el carrito de compras
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    

    //Eliminar el producto del carrito en el DOM
    
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        
        this.calcularTotal();
    }

   

    //Elimina todos los productos
    limpiarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();

        return false;
    }

   
    //Almacenar en el LS
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar producto
        productos.push(producto);
        //Agregando al local storage
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobando que tenemos elementos en el Local storage
    obtenerProductosLocalStorage(){
        let productoLS;

   
        //OPERADOR TERNARIO

        (localStorage.getItem('productos') === null) ? (productoLS = []) : (productoLS = JSON.parse(localStorage.getItem('productos'))); 

        
        //SPREAD DE ARRAYS
        console.log(...productoLS);

        return productoLS;

    }

    //Mostrar los productos guardados en el LS
   
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){

            //Construcción de la plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    //Muestra productos guardados en el local storage
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Eliminar producto por ID del LS


    //Eliminar todos los datos del LS
    vaciarLocalStorage(){
        localStorage.clear();
    }

       
//Procesar pedido
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "resumen.html";
        }
    }

}

//METODO PARA BUSCAR PRODUCTOS

document.addEventListener('keyup', (e) => {
    if(e.target.matches('.filter')){

        document.querySelectorAll('.card').forEach(card => {
            // if(card.innerHTML.toLowerCase().includes(e.target.value)){
            //     card.classList.remove('hidden')
            // }else{
            //     card.classList.add('hidden')
            // }


            // Operador ternario
            (card.innerHTML.toLowerCase().includes(e.target.value)) ? card.classList.remove('hidden') : card.classList.add('hidden')



        })

    }
})


