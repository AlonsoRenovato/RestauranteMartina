let desayunos = [];
let comidas = [];
let postres = [];
let bebidas = [];


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
    volver.onclick = mostrarMenuPrincipal;
    popup.appendChild(volver);

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

        popup.appendChild(div);
    });
}

function mostrarMenuPrincipal() {
    const popup = document.getElementById('popup');

    popup.innerHTML = ''; // Limpiar el contenido del popup

    const title = document.createElement('h2');
    title.innerText = 'Realiza tu pedido';
    popup.appendChild(title);
    
    const description = document.createElement('p');
    description.innerText = 'Elige tus platillos y bebidas:';
    popup.appendChild(description);
    popup.appendChild(document.createElement('br'));

    // Menú de opciones
    const menuList = document.createElement('div');
    menuList.classList.add('menu-list');
    
    const desayunosDiv = document.createElement('div');
    desayunosDiv.classList.add('menu-div');
    desayunosDiv.onclick = obtenerDesayunos;  // Aquí ponemos el manejador para mostrar los desayunos
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
    //comidasDiv.onclick = obtenerComidas;
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
    //postresDiv.onclick = obtenerPostres;
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
    //bebidasDiv.onclick = obtenerBebidas;
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