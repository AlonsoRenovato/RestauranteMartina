let desayunos = [];
let comidas = [];
let postres = [];
let bebidas = [];
let carrito = [];
let globalSucursal;
let ADomicilio = true;
let costoTotal = 0;

// DESAYUNOS
async function obtenerDesayunos() {
    console.log('Se llamó la función obtenerDesayunos');

    try {
        const respuesta = await fetch('http://localhost:3000/desayunos')
        desayunos = await respuesta.json();
        mostrarDesayunos(desayunos);

    } catch (error) {
        console.error('Error al obtener los desayunos: ', error);
    }
}

function mostrarDesayunos(desayunos) {
    console.log('Se llamó la función mostrarDesayunos');
    console.log(desayunos);

    popup = document.getElementById('popup');

    popup.innerHTML = '';

    const volver = document.createElement('img');
    volver.src = 'assets/img/back.jpg';
    volver.classList.add('volver-btn');
    volver.onclick = mostrarMenuPrincipal;  // llamar función al hacer click
    popup.appendChild(volver);

    const carritoButton = document.createElement('img');
    carritoButton.src = 'assets/img/cart.jpg';
    carritoButton.classList.add('carrito-btn');
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carritoButton);

    const title = document.createElement('h2');
    title.innerText = 'Desayunos';
    popup.appendChild(title);

    desayunos.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-div');

        const h3 = document.createElement('h3');
        h3.innerText = item.Nombre;
        div.appendChild(h3);

        const p = document.createElement('p');
        p.innerText = item.Descripcion;
        div.appendChild(p);

        const p2 = document.createElement('p');
        p2.innerText = '$' + item.Precio.toFixed(2);
        div.appendChild(p2);

        div.onclick = () => mostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// COMIDAS
async function obtenerComidas() {
    console.log('Se llamó la función obtenerComidas');

    try {
        const respuesta = await fetch('http://localhost:3000/comidas')
        comidas = await respuesta.json();
        console.log(comidas);
        mostrarComidas(comidas);

    } catch (error) {
        console.error('Error al obtener las comidas: ', error);
    }
}

function mostrarComidas(comidas) {
    console.log('Se llamó la función mostrarComidas');
    console.log(comidas);

    popup = document.getElementById('popup');

    popup.innerHTML = '';

    const volver = document.createElement('img');
    volver.src = 'assets/img/back.jpg';
    volver.classList.add('volver-btn');
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const carritoButton = document.createElement('img');
    carritoButton.src = 'assets/img/cart.jpg';
    carritoButton.classList.add('carrito-btn');
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carritoButton);

    const title = document.createElement('h2');
    title.innerText = 'Comidas';
    popup.appendChild(title);

    comidas.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-div');

        const h3 = document.createElement('h3');
        h3.innerText = item.Nombre;
        div.appendChild(h3);

        const p = document.createElement('p');
        p.innerText = item.Descripcion;
        div.appendChild(p);

        const p2 = document.createElement('p');
        p2.innerText = '$' + item.Precio.toFixed(2);
        div.appendChild(p2);

        div.onclick = () => mostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// POSTRES
async function obtenerPostres() {
    console.log('Se llamó la función obtenerPostres');

    try {
        const respuesta = await fetch('http://localhost:3000/postres')
        postres = await respuesta.json();
        console.log(postres);
        mostrarPostres(postres);

    } catch (error) {
        console.error('Error al obtener los postres: ', error);
    }
}

function mostrarPostres(postres) {
    console.log('Se llamó la función mostrarPostres');
    console.log(postres);

    popup = document.getElementById('popup');

    popup.innerHTML = '';

    const volver = document.createElement('img');
    volver.src = 'assets/img/back.jpg';
    volver.classList.add('volver-btn');
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const carritoButton = document.createElement('img');
    carritoButton.src = 'assets/img/cart.jpg';
    carritoButton.classList.add('carrito-btn');
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carritoButton);

    const title = document.createElement('h2');
    title.innerText = 'Postres';
    popup.appendChild(title);

    postres.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-div');

        const h3 = document.createElement('h3');
        h3.innerText = item.Nombre;
        div.appendChild(h3);

        const p = document.createElement('p');
        p.innerText = item.Descripcion;
        div.appendChild(p);

        const p2 = document.createElement('p');
        p2.innerText = '$' + item.Precio.toFixed(2);
        div.appendChild(p2);

        div.onclick = () => mostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// BEBIDAS
async function obtenerBebidas() {
    console.log('Se llamó la función obtenerBebidas');

    try {
        const respuesta = await fetch('http://localhost:3000/bebidas')
        bebidas = await respuesta.json();
        console.log(bebidas);
        mostrarBebidas(bebidas);

    } catch (error) {
        console.error('Error al obtener las bebidas: ', error);
    }
}

function mostrarBebidas(bebidas) {
    console.log('Se llamó la función mostrarBebidas');
    console.log(bebidas);

    popup = document.getElementById('popup');

    popup.innerHTML = '';

    const volver = document.createElement('img');
    volver.src = 'assets/img/back.jpg';
    volver.classList.add('volver-btn');
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const carritoButton = document.createElement('img');
    carritoButton.src = 'assets/img/cart.jpg';
    carritoButton.classList.add('carrito-btn');
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carritoButton);

    const title = document.createElement('h2');
    title.innerText = 'Bebidas';
    popup.appendChild(title);

    bebidas.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-div');

        const h3 = document.createElement('h3');
        h3.innerText = item.Nombre;
        div.appendChild(h3);

        const p = document.createElement('p');
        p.innerText = item.Descripcion;
        div.appendChild(p);

        const p2 = document.createElement('p');
        p2.innerText = '$' + item.Precio.toFixed(2);
        div.appendChild(p2);

        div.onclick = () => mostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// MOSTRAR EL CARRITO
function mostrarCarrito() {
    console.log('el carrito tiene: ', carrito); // para verificar que está tomando el carrito
    console.log('el costo total es: ', costoTotal);
    const popup = document.getElementById('popup');
    popup.innerHTML = '';

    const volver = document.createElement('button');
    volver.innerText = '< Menú Principal';
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const title = document.createElement('h2');
    title.innerText = 'Mi Carrito'
    popup.appendChild(title);

    carrito.forEach(producto => {
        const itemDiv = document.createElement('div'); 
        itemDiv.classList.add('item-carrito');

        const itemNombre = document.createElement('h5');
        itemNombre.innerText = `${producto.Nombre} x${producto.cantidad}`;
        itemDiv.appendChild(itemNombre);

        const itemPrecioTotal = document.createElement('p');
        itemPrecioTotal.innerText = `Subtotal: $${producto.precioTotal.toFixed(2)}`;
        itemDiv.appendChild(itemPrecioTotal);

        const cambiarCantidadButton = document.createElement('button');
        cambiarCantidadButton.innerText = 'Cambiar cantidad';
        cambiarCantidadButton.onclick = function() {
            cambiarCantidadPopup(producto);
        }
        itemDiv.appendChild(cambiarCantidadButton);

        const eliminarButton = document.createElement('button');
        eliminarButton.innerText = 'Eliminar';
        eliminarButton.onclick = function() {
            eliminarProducto(producto);
            mostrarNotificacionEliminado();
        };
        itemDiv.appendChild(eliminarButton);

        popup.appendChild(itemDiv);
 
    });

    const totalText = document.createElement('p');
    totalText.innerText = `Total: $${costoTotal.toFixed(2)}`;
    popup.appendChild(totalText);

    const checkoutButton = document.createElement('button');
    checkoutButton.innerText = 'Realizar Pedido'
    checkoutButton.onclick = function() {
        if (carrito <= 0) {
            alert('¡No hay items en el carrito!');
        } else {
            mostrarADomicilioMenu();
        }
    };
    popup.appendChild(checkoutButton);
}

// MOSTRAR POPUP PARA AGREGAR AL CARRITO
function mostrarCarritoPopup(item) {
    const carritoPopup = document.getElementById('carrito-popup');
    carritoPopup.style.display = 'flex';

    // poner el nombre del item
    const nombreItem = document.getElementById('popup-title');
    nombreItem.innerText = `${item.Nombre}`;

    // establecer botón de cerrar
    const botonCerrar = document.getElementById('close-popup');
    botonCerrar.onclick = function() {
        carritoPopup.style.display = 'none';
    };
    
    // establecer botón de agregar
    const botonAgregar = document.getElementById('btn-agregar');

    botonAgregar.onclick = function() {
       agregarProducto(item, carritoPopup);
    }
}

// AGREGAR PRODUCTOS AL CARRITO
function agregarProducto(item, carritoPopup) { 
    console.log('el item a agregar es:', item);
    const cantidad = parseInt(document.getElementById('cantidad-item').value);

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 10) {
        alert("Por favor, ingrese una cantidad válida (entre 1 y 10).");
        return;
    }
    let productoExistente = carrito.find(producto => producto.Nombre === item.Nombre); // ya existe ese producto en 
    // el carrito?

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        costoTotal -= productoExistente.precioTotal;
        productoExistente.precioTotal = productoExistente.Precio * productoExistente.cantidad
        costoTotal += productoExistente.precioTotal;
    } else {
        item.cantidad = cantidad;
        item.precioTotal = item.Precio * cantidad;
        costoTotal += item.precioTotal;
        carrito.push(item);
    }

    carritoPopup.style.display = 'none';
    mostrarNotificacionAgregado();
}

// funcioncita para notificar que ya se agregó el producto
function mostrarNotificacionAgregado() {
    const notificacion = document.getElementById('notificacion');
    notificacion.classList.add('show');  // Agrega la clase 'show' para mostrarla

    // Después de 3 segundos, ocultamos la notificación
    setTimeout(function() {
        notificacion.classList.remove('show');
    }, 3000);  // 3000 ms
}

// ELIMINAR PRODUCTOS DEL CARRITO
function eliminarProducto(item) {
    carrito = carrito.filter(producto => producto !== item);
    costoTotal -= item.precioTotal;
    mostrarCarrito();
}

// funcioncita para notificar que ya se eliminó el producto
function mostrarNotificacionEliminado() {
    console.log('Se llamó la función de notificar eliminación');
    const notificacion = document.getElementById('notificacion2');
    notificacion.classList.add('show');  // Agrega la clase 'show' para mostrarla

    // Después de 3 segundos, ocultamos la notificación
    setTimeout(function() {
        notificacion.classList.remove('show');
    }, 3000);  // 3000 ms
}

// MODIFICAR CANTIDAD DE PRODUCTO EN CARRITO
function cambiarCantidadPopup(item) {
    const popup = document.getElementById('modificar-popup');
    popup.style.display = 'flex';

    // poner el nombre del item
    const nombreItem = document.getElementById('popup-title2');
    nombreItem.innerText = `${item.Nombre}`;

    // establecer botón de cerrar
    const botonCerrar = document.getElementById('close-popup2');
    botonCerrar.onclick = function() {
        popup.style.display = 'none';
    };
    
    // establecer botón de agregar
    const botonActualizar = document.getElementById('btn-actualizar');

    botonActualizar.onclick = function() {
       cambiarCantidadProducto(item, popup);
    };
}

// CAMBIAR CANTIDAD DE UN PRODUCTO EN EL CARRITO
function cambiarCantidadProducto(item, popup) {
    const nuevaCantidad = parseInt(document.getElementById('cantidad-item2').value);

    if (isNaN(nuevaCantidad) || nuevaCantidad < 1 || nuevaCantidad > 10) {
        alert("Por favor, ingrese una cantidad válida (entre 1 y 10).");
        return;
    }

    item.cantidad = nuevaCantidad;

    costoTotal -= item.precioTotal;
    const nuevoPrecio = item.cantidad * item.Precio;
    item.precioTotal = nuevoPrecio;
    costoTotal += item.precioTotal;

    popup.style.display = 'none';
    mostrarCarrito();
}

// MOSTRAR MENÚ DE MODO DE ENTREGA (A DOMICILIO/PARA RECOGER)
function mostrarADomicilioMenu() {
    console.log('llamando función de menú de modo de entrega');
    const popup = document.getElementById('popup');

    popup.innerHTML = '';

    const volverButton = document.createElement('button');
    volverButton.innerText = 'Volver';
    volverButton.onclick = mostrarCarrito;
    popup.appendChild(volverButton);

    const sucursalText = document.createElement('p');
    if (globalSucursal) {
        sucursalText.innerText = `Sucursal elegida: ${globalSucursal.Sucursal}`
    } else {
        sucursalText.innerText = 'No se ha elegido sucursal';
    }
    popup.appendChild(sucursalText);

    const title = document.createElement('h2');
    title.innerText = 'Elige tu modo de entrega';
    popup.appendChild(title);

    const opcionesSection = document.createElement('div');
    opcionesSection.classList.add('menu-list');

    const aDomicilioDiv = document.createElement('div');
    aDomicilioDiv.classList.add('menu-div');
    aDomicilioDiv.onclick = setEntregaADomicilio;  // aquí ponemos el manejador para establecer el modo de entrega
    const aDomicilioImage = document.createElement('img');
    aDomicilioImage.src = 'assets/img/delivery.jpg';
    aDomicilioDiv.appendChild(aDomicilioImage);
    const aDomicilioTitle = document.createElement('h3');
    aDomicilioTitle.innerText = 'A Domicilio (+$30 de envío)';
    aDomicilioDiv.appendChild(aDomicilioTitle);

    opcionesSection.appendChild(aDomicilioDiv);

    const paraRecogerDiv = document.createElement('div');
    paraRecogerDiv.classList.add('menu-div');
    paraRecogerDiv.onclick = setEntregaParaRecoger;  // aquí ponemos el manejador para establecer el modo de entrega
    const paraRecogerImage = document.createElement('img');
    paraRecogerImage.src = 'assets/img/takeout.jpg';
    paraRecogerDiv.appendChild(paraRecogerImage);
    const paraRecogerTitle = document.createElement('h3');
    paraRecogerTitle.innerText = `Para Recoger (sucursal ${globalSucursal.Sucursal})`;
    paraRecogerDiv.appendChild(paraRecogerTitle);

    opcionesSection.appendChild(paraRecogerDiv);

    popup.appendChild(opcionesSection);
}

// ESTABLECER ENTREGA A DOMICILIO
function setEntregaADomicilio() {
    ADomicilio = true;
    confirmarPedido(carrito, costoTotal, globalSucursal, ADomicilio);
}

// ESTABLECER ENTREGA PARA RECOGER
function setEntregaParaRecoger() {
    ADomicilio = false;
    confirmarPedido(carrito, costoTotal, globalSucursal, ADomicilio);
}

// MOSTRAR MENÚ PRINCIPAL
function mostrarMenuPrincipal() {
    console.log('llamando función de menú principal');
    const popup = document.getElementById('popup');

    popup.innerHTML = '';

    const carritoButton = document.createElement('img');
    carritoButton.src = 'assets/img/cart.jpg';
    carritoButton.classList.add('carrito-btn');
    carritoButton.onclick = mostrarCarrito;
    popup.appendChild(carritoButton);

    const sucursalText = document.createElement('p');
    if (globalSucursal) {
        console.log('Claves del objeto:', Object.keys(globalSucursal));
        console.log(`La sucursal que se debería mostrar es ${globalSucursal.Sucursal}`);
        sucursalText.innerText = `Sucursal elegida: ${globalSucursal.Sucursal}`
    } else {
        sucursalText.innerText = 'No se ha elegido sucursal';
    }
    sucursalText.classList.add('sucursal-text');
    popup.appendChild(sucursalText);

    const sucursalButton = document.createElement('button');
    sucursalButton.classList.add('sucursal-btn');
    sucursalButton.innerText = 'Cambiar';
    sucursalButton.onclick = menuSucursales;
    popup.appendChild(sucursalButton) 

    const title = document.createElement('h2');
    title.innerText = 'Realiza tu pedido';
    popup.appendChild(title);
    
    const description = document.createElement('p');
    description.innerText = 'Elige tus platillos y bebidas:';
    popup.appendChild(description);
    popup.appendChild(document.createElement('br'));

    // menú de opciones
    const menuList = document.createElement('div');
    menuList.classList.add('menu-list');
    
    const desayunosDiv = document.createElement('div');
    desayunosDiv.classList.add('menu-div');
    desayunosDiv.onclick = obtenerDesayunos;  // aquí ponemos el manejador para mostrar los desayunos
    const desayunosImage = document.createElement('img');
    desayunosImage.src = 'assets/img/desayuno-menu.jpg';
    desayunosDiv.appendChild(desayunosImage);
    const desayunosTitle = document.createElement('h3');
    desayunosTitle.innerText = 'Desayunos';
    desayunosDiv.appendChild(desayunosTitle);
    const desayunosDescription = document.createElement('p');
    desayunosDescription.innerText = 'Empieza tu día de la mejor manera con nuestros desayunos';
    desayunosDiv.appendChild(desayunosDescription);

    menuList.appendChild(desayunosDiv);

    const comidasDiv = document.createElement('div');
    comidasDiv.classList.add('menu-div');
    comidasDiv.onclick = obtenerComidas;
    const comidasImage = document.createElement('img');
    comidasImage.src = 'assets/img/comida-menu.jpg';
    comidasDiv.appendChild(comidasImage);
    const comidasTitle = document.createElement('h3');
    comidasTitle.innerText = 'Comidas';
    comidasDiv.appendChild(comidasTitle);
    const comidasDescription = document.createElement('p');
    comidasDescription.innerText = 'Los platillos perfectos para tus antojos de mediodía';
    comidasDiv.appendChild(comidasDescription);

    menuList.appendChild(comidasDiv);

    const postresDiv = document.createElement('div');
    postresDiv.classList.add('menu-div');
    postresDiv.onclick = obtenerPostres;
    const postresImage = document.createElement('img');
    postresImage.src = 'assets/img/postre-menu.jpg';
    postresDiv.appendChild(postresImage);
    const postresTitle = document.createElement('h3');
    postresTitle.innerText = 'Postres';
    postresDiv.appendChild(postresTitle);
    const postresDescription = document.createElement('p');
    postresDescription.innerText = 'Deliciosos postres para terminar tu comida';
    postresDiv.appendChild(postresDescription);

    menuList.appendChild(postresDiv);

    const bebidasDiv = document.createElement('div');
    bebidasDiv.classList.add('menu-div');
    bebidasDiv.onclick = obtenerBebidas;
    const bebidasImage = document.createElement('img');
    bebidasImage.src = 'assets/img/bebida-menu.jpg';
    bebidasDiv.appendChild(bebidasImage);
    const bebidasTitle = document.createElement('h3');
    bebidasTitle.innerText = 'Bebidas';
    bebidasDiv.appendChild(bebidasTitle);
    const bebidasDescription = document.createElement('p');
    bebidasDescription.innerText = 'Bebidas refrescantes para acompañar tu comida';
    bebidasDiv.appendChild(bebidasDescription);

    menuList.appendChild(bebidasDiv);

    popup.appendChild(menuList);
}

// MOSTRAR SELECCIÓN DE SUCURSAL
function menuSucursales() {
    console.log('llamando función de menuSucursales');
    const popup = document.getElementById('popup');

    popup.innerHTML = '';

    const title = document.createElement('h2');
    title.innerText = 'Elige tu sucursal';
    popup.appendChild(title);

    // menú de opciones
    const sucursalesList = document.createElement('div');
    sucursalesList.classList.add('menu-list');
    
    const cumbresDiv = document.createElement('div');
    cumbresDiv.classList.add('menu-div');
    cumbresDiv.onclick = async function () {
        try {
            const respuesta = await fetch('http://localhost:3000/sucursales/Cumbres');
            data = await respuesta.json();

            console.log('Respuesta de la API:', data);

            if (!data || !Array.isArray(data) || data.length === 0) { // si no está la sucursal
                console.error('la API funcionó, pero la sucursal no fue encontrada');
                alert('Sucursal no encontrada');
                return;
            }

            // si sí está:
            console.log('la sucursal obtenida fue: ', data); // para troubleshooting
            globalSucursal = data[0];
            console.log('La sucursal almacenada en globalSucursal:', globalSucursal);
            mostrarMenuPrincipal(); // guardar sucursal y mostrar menú principal
        } catch (error) {
            console.error('Error al obtener la sucursal Cumbres: ', error);
        }
    }
    const cumbresImage = document.createElement('img');
    cumbresImage.src = 'assets/img/location.jpg';
    cumbresDiv.appendChild(cumbresImage);
    const cumbresTitle = document.createElement('h3');
    cumbresTitle.innerText = 'Cumbres';
    cumbresDiv.appendChild(cumbresTitle);
    sucursalesList.appendChild(cumbresDiv);

    const gonzalitosDiv = document.createElement('div');
    gonzalitosDiv.classList.add('menu-div');
    gonzalitosDiv.onclick = async function () {
        try {
            const respuesta = await fetch('http://localhost:3000/sucursales/Gonzalitos');
            data = await respuesta.json();

            console.log('Respuesta de la API:', data);

            if (!data || !Array.isArray(data) || data.length === 0) { // si no está la sucursal
                console.error('la API funcionó, pero la sucursal no fue encontrada');
                alert('Sucursal no encontrada');
                return;
            }

            // si sí está:
            console.log('la sucursal obtenida fue: ', data); // para troubleshooting
            globalSucursal = data[0];
            console.log('La sucursal almacenada en globalSucursal:', globalSucursal);
            mostrarMenuPrincipal(); // guardar sucursal y mostrar menú principal
        } catch (error) {
            console.error('Error al obtener la sucursal Gonzalitos: ', error);
        }
    }
    const gonzalitosImage = document.createElement('img');
    gonzalitosImage.src = 'assets/img/location.jpg';
    gonzalitosDiv.appendChild(gonzalitosImage);
    const gonzalitosTitle = document.createElement('h3');
    gonzalitosTitle.innerText = 'Gonzalitos';
    gonzalitosDiv.appendChild(gonzalitosTitle);
    sucursalesList.appendChild(gonzalitosDiv);

    const lincolnDiv = document.createElement('div');
    lincolnDiv.classList.add('menu-div');
    lincolnDiv.onclick = async function () {
        try {
            const respuesta = await fetch('http://localhost:3000/sucursales/Lincoln');
            data = await respuesta.json();

            console.log('Respuesta de la API:', data);

            if (!data || !Array.isArray(data) || data.length === 0) { // si no está la sucursal
                console.error('la API funcionó, pero la sucursal no fue encontrada');
                alert('Sucursal no encontrada');
                return;
            }

            // si sí está:
            console.log('la sucursal obtenida fue: ', data); // para troubleshooting
            globalSucursal = data[0];
            console.log('La sucursal almacenada en globalSucursal:', globalSucursal);
            mostrarMenuPrincipal(); // guardar sucursal y mostrar menú principal
        } catch (error) {
            console.error('Error al obtener la sucursal Lincoln: ', error);
        }
    }
    const lincolnImage = document.createElement('img');
    lincolnImage.src = 'assets/img/location.jpg';
    lincolnDiv.appendChild(lincolnImage);
    const lincolnTitle = document.createElement('h3');
    lincolnTitle.innerText = 'Lincoln';
    lincolnDiv.appendChild(lincolnTitle);
    sucursalesList.appendChild(lincolnDiv);

    const leonesDiv = document.createElement('div');
    leonesDiv.classList.add('menu-div');
    leonesDiv.onclick = async function () {
        try {
            const respuesta = await fetch('http://localhost:3000/sucursales/Leones');
            data = await respuesta.json();

            console.log('Respuesta de la API:', data);

            if (!data || !Array.isArray(data) || data.length === 0) { // si no está la sucursal
                console.error('la API funcionó, pero la sucursal no fue encontrada');
                alert('Sucursal no encontrada');
                return;
            }

            // si sí está:
            console.log('la sucursal obtenida fue: ', data); // para troubleshooting
            globalSucursal = data[0];
            console.log('La sucursal almacenada en globalSucursal:', globalSucursal);
            mostrarMenuPrincipal(); // guardar sucursal y mostrar menú principal
        } catch (error) {
            console.error('Error al obtener la sucursal Leones: ', error);
        }
    }
    const leonesImage = document.createElement('img');
    leonesImage.src = 'assets/img/location.jpg';
    leonesDiv.appendChild(leonesImage);
    const leonesTitle = document.createElement('h3');
    leonesTitle.innerText = 'Leones';
    leonesDiv.appendChild(leonesTitle);
    sucursalesList.appendChild(leonesDiv);

    popup.appendChild(sucursalesList);
}

function confirmarPedido(items, costoTotalPedido, sucursal, modoEntrega) {
    const popup = document.getElementById('popup');

    popup.innerHTML = '';

    const title = document.createElement('h2');
    title.innerText = 'Confirma tu pedido';
    popup.appendChild(title);

    if (modoEntrega == true) {
        costoTotalPedido += 30;
    }

    // LISTA DE PRODUCTOS
    const listContainer = document.createElement('div');
    listContainer.classList.add('pedido-lista');

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('pedido-item');

        itemDiv.innerHTML = `
            <span class="nombre">${item.Nombre}</span> 
            <span class="cantidad">x${item.cantidad}</span> 
            <span class="subtotal">$${item.precioTotal.toFixed(2)}</span>
        `;

        listContainer.appendChild(itemDiv);
    });
    popup.appendChild(listContainer);

    // PRECIO TOTAL
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('pedido-total');
    if (modoEntrega) {
        totalDiv.innerHTML = `<strong>Total (+ $30 envío):</strong> $${costoTotalPedido.toFixed(2)}`;
    } else {
        totalDiv.innerHTML = `<strong>Total:</strong> $${costoTotalPedido.toFixed(2)}`;
    }
    popup.appendChild(totalDiv);

    // INFORMACIÓN DE ENTREGA
    const entregaDiv = document.createElement('div');
    entregaDiv.classList.add('pedido-entrega');
    entregaDiv.innerHTML = `
        <strong>Sucursal:</strong> ${sucursal.Sucursal} <br>
        <strong>Modo de entrega:</strong> ${modoEntrega ? 'A domicilio' : 'Para recoger'}
    `;
    popup.appendChild(entregaDiv);

    // BOTÓN DE CONFIRMACIÓN
    const confirmarBtn = document.createElement('button');
    confirmarBtn.innerText = 'Confirmar Pedido';
    confirmarBtn.classList.add('btn-confirmar');
    confirmarBtn.onclick = () => {
        hacerPedido(modoEntrega, sucursal, items, costoTotalPedido);
    };
    popup.appendChild(confirmarBtn);

    // BOTÓN DE VOLVER
    const volverBtn = document.createElement('button');
    volverBtn.innerText = 'Volver';
    volverBtn.classList.add('btn-volver'); 
    volverBtn.onclick = () => {
        mostrarCarrito();
    }
    popup.appendChild(volverBtn);
}

// HACER PEDIDO
async function hacerPedido(modoEntrega, sucursal, carrito, costoTotal) {
    console.log('Modo de entrega:', modoEntrega);
    console.log('Sucursal ID:', sucursal.SucursalID);
    console.log('Carrito:', carrito);
    console.log('Costo Total:', costoTotal);

    const pedidoData = {
        ADomicilio: modoEntrega,
        SucursalID: sucursal.SucursalID, // asumiendo que sucursal tiene un campo id
        carrito: carrito.map(item => ({
            MenuItemID: item.MenuItemID, // Asumiendo que cada item tiene un campo id
            Cantidad: item.cantidad,
            Subtotal: item.precioTotal
        })),
        costoTotal: costoTotal
    };

    // hacer el request a la api
    await fetch('http://localhost:3000/crearPedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData), // Enviar los datos en formato JSON
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Si el pedido fue exitoso, puedes mostrar un mensaje o redirigir
            console.log('Pedido realizado exitosamente:', data);
        } else {
            // Si hubo algún error, manejarlo
            console.error('Error al realizar el pedido:', data.message);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}