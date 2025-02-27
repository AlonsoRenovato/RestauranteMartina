let desayunos = [];
let comidas = [];
let postres = [];
let bebidas = [];
let carrito = [];

// DESAYUNOS
async function obtenerDesayunos() {
    console.log('Se llamó la función obtenerDesayunos');

    try {
        const respuesta = await fetch('http:localhost:3000/desayunos')
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

    const volver = document.createElement('button');
    volver.innerText = '< Volver';
    volver.onclick = mostrarMenuPrincipal;  // llamar función al hacer click
    popup.appendChild(volver);

    const carrito = document.createElement('button');
    carrito.innerText = 'Carrito';
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carrito);

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
        p2.innerText = '$' + item.Precio;
        div.appendChild(p2);

        div.onclick = () => MostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// COMIDAS
async function obtenerComidas() {
    console.log('Se llamó la función obtenerComidas');

    try {
        const respuesta = await fetch('http:localhost:3000/comidas')
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

    const volver = document.createElement('button');
    volver.innerText = '< Volver';
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const carrito = document.createElement('button');
    carrito.innerText = 'Carrito';
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carrito);

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
        p2.innerText = '$' + item.Precio;
        div.appendChild(p2);

        div.onclick = () => MostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// POSTRES
async function obtenerPostres() {
    console.log('Se llamó la función obtenerPostres');

    try {
        const respuesta = await fetch('http:localhost:3000/postres')
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

    const volver = document.createElement('button');
    volver.innerText = '< Volver';
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const carrito = document.createElement('button');
    carrito.innerText = 'Carrito';
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carrito);

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
        p2.innerText = '$' + item.Precio;
        div.appendChild(p2);

        div.onclick = () => MostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// BEBIDAS
async function obtenerBebidas() {
    console.log('Se llamó la función obtenerBebidas');

    try {
        const respuesta = await fetch('http:localhost:3000/bebidas')
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

    const volver = document.createElement('button');
    volver.innerText = '< Volver';
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

    const carrito = document.createElement('button');
    carrito.innerText = 'Carrito';
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carrito);

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
        p2.innerText = '$' + item.Precio;
        div.appendChild(p2);

        div.onclick = () => MostrarCarritoPopup(item);
        popup.appendChild(div);
    });
}

// MOSTRAR EL CARRITO
function mostrarCarrito() {
    console.log('el carrito tiene: ', carrito); // para verificar que si está tomando el carrito

    const popup = document.getElementById('popup');
    popup.innerHTML = '';

    const title = document.createElement('h2');
    title.innerText = 'Mi Carrito'
    popup.appendChild(title);

    const volver = document.createElement('button');
    volver.innerText = '< Menú Principal';
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);
}

// MOSTRAR POPUP PARA AGREGAR AL CARRITO
function MostrarCarritoPopup(item) {
    const carritoPopup = document.getElementById('carrito-popup');
    carritoPopup.style.display = 'flex';

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

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida (mayor que 0).");
        return;
    }
    let productoExistente = carrito.find(producto => producto.Nombre === item.Nombre); // ya existe ese producto en 
    // el carrito?

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.precioTotal = productoExistente.Precio * productoExistente.cantidad
    } else {
        item.cantidad = cantidad;
        item.precioTotal = item.Precio * cantidad;
        carrito.push(item);
    }

    carritoPopup.style.display = 'none';
    mostrarNotificacion();
}

// funcioncita para notificar que ya se agregó el producto
function mostrarNotificacion() {
    const notificacion = document.getElementById('notificacion');
    notificacion.classList.add('show');  // Agrega la clase 'show' para mostrarla

    // Después de 3 segundos, ocultamos la notificación
    setTimeout(function() {
        notificacion.classList.remove('show');
    }, 3000);  // 3000 ms
}

// MOSTRAR MENÚ PRINCIPAL
function mostrarMenuPrincipal() {
    const popup = document.getElementById('popup');

    popup.innerHTML = '';

    const carrito = document.createElement('button');
    carrito.innerText = 'Carrito';
    carrito.onclick = mostrarCarrito;
    popup.appendChild(carrito);

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