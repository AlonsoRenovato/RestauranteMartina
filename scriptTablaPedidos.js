let pedidosOriginales = [];
let globalSucursales = [];
let sucursalesMap = new Map();

// cargar sucursales apenas

// función para obtener los pedidos de la ruta del server
async function obtenerPedidos() {
    try {
        const response = await fetch('http://localhost:3000/pedidos');
        pedidosOriginales = await response.json();
        mostrarPedidos(pedidosOriginales); // muestra los pedidos en la tabla de html (función abajo)
    } catch (error) {
        console.error('Error al obtener los pedidos: ', error)
    }
}

// función para obtener las sucursales
async function obtenerSucursales() {
    try {
        const response = await fetch('http://localhost:3000/sucursales');
        globalSucursales = await response.json();

        globalSucursales.forEach(sucursal => {
            sucursalesMap.set(sucursal.SucursalID, sucursal.Sucursal);
        }) 
    } catch (error) {
        console.error('Error al obtener las sucursales:', error);
    }
}

// función para mostrar los pedidos
function mostrarPedidos(pedidos) {
    const tablaBody = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];

        tablaBody.innerHTML = '';

        pedidos.forEach(pedido => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${pedido.PedidoID}</td>
                <td>${pedido.FechaPedido}</td>
                <td>${sucursalesMap.get(pedido.SucursalID) || 'Desconocida'}</td>
                <td>${pedido.ADomicilio ? 'Sí' : 'No'}</td>
                <td>
                    ${pedido.isConfirmado ? 'Sí' : 'No'}
                    <div class="btn-div">
                        ${pedido.isConfirmado ? '' : `
                        <button id = 'confirm-btn' type="submit" onclick="confirmarPedidoPopup(${pedido.PedidoID})">Confirmar</button>`}
                        <button type="submit" onclick="verPedidoPopup(${pedido.PedidoID})">Ver</button>
                        <button id="btn-eliminar" type="submit" onclick="eliminarPedidoPopup(${pedido.PedidoID})">
                            <img src="assets/img/delete.png" id="img-delete" alt="Eliminar">
                        </button>
                    </div>
                </td>
            `;

            tablaBody.appendChild(fila);
        });
}


function filtrarPedidos() {
    let filtroPedidoID = document.getElementById('filtroPedidoID').value.toLowerCase();
    let filtroFechaPedido = document.getElementById('filtroFechaPedido').value;
    let filtroSucursal = document.getElementById('filtroSucursal').value;
    let filtroAdomicilio = document.getElementById('filtroAdomicilio').value;
    let filtroConfirmado = document.getElementById('filtroConfirmado').value;

    const pedidosFiltrados = pedidosOriginales.filter(pedido =>
        (filtroPedidoID === '' || pedido.PedidoID.toString().includes(filtroPedidoID)) &&
        (filtroFechaPedido === '' || pedido.FechaPedido.toLowerCase().includes(filtroFechaPedido)) &&
        (filtroSucursal === '' || sucursalesMap.get(pedido.SucursalID)?.toString().includes(filtroSucursal)) &&
        (filtroAdomicilio === '' || (pedido.ADomicilio ? 'sí' : 'no') === filtroAdomicilio) &&
        (filtroConfirmado === '' || (pedido.isConfirmado ? 'sí' : 'no') === filtroConfirmado)
    );

    mostrarPedidos(pedidosFiltrados);
}

// función que correrá cuando la página cargue
window.onload = async function() {
    await obtenerSucursales(); // esta función asigna las sucursales al array global globalSucursales

    const filtroSucursalHTML = document.getElementById('filtroSucursal'); // tomamos el filtro del html

    console.log('se seleccionó el filtro. no se ha entrado al forEach');
    globalSucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.Sucursal;
        option.textContent = sucursal.Sucursal;
        filtroSucursalHTML.appendChild(option);
    });

    obtenerPedidos(); // muestra la lista completa de pedidos
    
    //event listeners en los inputs de filtro
    document.getElementById('filtroPedidoID').addEventListener('input', filtrarPedidos);
    document.getElementById('filtroFechaPedido').addEventListener('input', filtrarPedidos);
    document.getElementById('filtroSucursal').addEventListener('change', filtrarPedidos);
    document.getElementById('filtroAdomicilio').addEventListener('change', filtrarPedidos);
    document.getElementById('filtroConfirmado').addEventListener('change', filtrarPedidos);
}

function confirmarPedidoPopup(pedidoId) {
    const popup = document.getElementById("popup-confirmar");
    const btnConfirmar = document.getElementById("popup-confirm");
    const btnCancelar = document.getElementById("popup-cancel-confirm");

    popup.classList.add("show-popup");

    btnConfirmar.onclick = function () {
        confirmarPedido(pedidoId);
        popup.classList.remove("show-popup");
    };

    btnCancelar.onclick = function () {
        popup.classList.remove("show-popup");
    };
}

function eliminarPedidoPopup(pedidoId) {
    const popup = document.getElementById("popup-delete");
    const btnConfirmar = document.getElementById("btn-delete");
    const btnCancelar = document.getElementById("btn-cancel-delete");

    popup.classList.add("show-popup");

    btnConfirmar.onclick = async function () {
        await eliminarPedido(pedidoId);
        location.reload();
    };

    btnCancelar.onclick = function () {
        popup.classList.remove("show-popup");
    };
}

async function confirmarPedido(pedidoId, confirmar = true) {
    try {
        const response = await fetch(`/setStatusPedido/${confirmar ? '1' : '0'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ PedidoID: pedidoId }) // Enviamos el ID del pedido en el body
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Error al confirmar pedido:', data.message);
            alert('Error: ' + data.message);
            return;
        }

        console.log('Pedido confirmado con éxito:', data);
        alert('Pedido confirmado con éxito');

        location.reload();
    } catch (error) {
        console.error('Error en la petición:', error);
        alert('Error en la petición. Inténtalo de nuevo.');
    }
}

async function eliminarPedido(pedidoId) {
    console.log('se llama la funcion');
    try {
        const response = await fetch('http://localhost:3000/eliminarPedidoPorId', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pedidoId }), // enviar los datos en formato JSON
        });
    
        const data = await response.json();
        console.log('Respuesta del backend:', data);
    
        if (response.ok) {
            console.log('Pedido cancelado con éxito:', data.message);
        } else {
            console.error('Error al cancelar el pedido:', data.message);
    }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

function verPedidoPopup(pedidoId) {
    // Primero, hacer el fetch para obtener los items del pedido desde la API
    fetch(`/getPedidoItems`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ PedidoID: pedidoId }), // Enviar el PedidoID al backend
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data.success) {
            console.error('Error al obtener los items:', data.message);
            return;
        }

        // Si la respuesta es exitosa, se obtienen los items
        const items = data.items;

        // Eliminar cualquier popup existente
        const popupExistente = document.getElementById("popup-items");
        if (popupExistente) {
            popupExistente.remove();
        }

        // Crear el contenedor del popup
        const popup = document.createElement("div");
        popup.id = "popup-items";
        popup.classList.add("popup-items-overlay");

        // Crear el contenido del popup
        const popupContent = document.createElement("div");
        popupContent.classList.add("popup-items-content");

        // Agregar el título
        const titulo = document.createElement("h2");
        titulo.textContent = "Detalles del Pedido";
        popupContent.appendChild(titulo);

        // Crear la lista de items
        const lista = document.createElement("ul");
        lista.classList.add("popup-items-list");

        let total = 0;

        // Aquí usamos los datos de la respuesta para crear los elementos de la lista
        items.forEach(item => {
            const listItem = document.createElement("li");
            const subtotal = item.Subtotal; // Ya lo tiene el backend calculado
            total += subtotal;

            listItem.textContent = `${item.ItemNombre} x${item.Cantidad} - $${subtotal.toFixed(2)}`;
            lista.appendChild(listItem);
        });

        popupContent.appendChild(lista);

        // Mostrar el total
        const totalTexto = document.createElement("p");
        totalTexto.classList.add("popup-items-total");
        totalTexto.textContent = `Total: $${total.toFixed(2)}`;
        popupContent.appendChild(totalTexto);

        // Botón para cerrar el popup
        const btnCerrar = document.createElement("button");
        btnCerrar.textContent = "Cerrar";
        btnCerrar.classList.add("popup-items-close");
        btnCerrar.onclick = () => popup.remove();
        popupContent.appendChild(btnCerrar);

        // Agregar el contenido al popup
        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    })
    .catch((error) => {
        console.error('Error al hacer la solicitud a la API:', error);
    });
}
