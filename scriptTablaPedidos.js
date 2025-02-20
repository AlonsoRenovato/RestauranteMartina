let pedidosOriginales = [];

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

function mostrarPedidos(pedidos) {
    const tablaBody = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];

        tablaBody.innerHTML = '';

        pedidos.forEach(pedido => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${pedido.PedidoID}</td>
                <td>${pedido.UsuarioID}</td>
                <td>${pedido.OrdenID}</td>
                <td>${pedido.FechaPedido}</td>
                <td>${pedido.Adomicilio ? 'Sí' : 'No'}</td>
                <td>${pedido.SucursalID}</td>
            `;

            tablaBody.appendChild(fila);
        });
}


function filtrarPedidos() {
    let filtroPedidoID = document.getElementById('filtroPedidoID').value.toLowerCase();
    let filtroUsuarioID = document.getElementById('filtroUsuarioID').value.toLowerCase();
    let filtroOrdenID = document.getElementById('filtroOrdenID').value.toLowerCase();
    let filtroFechaPedido = document.getElementById('filtroFechaPedido').value;
    let filtroAdomicilio = document.getElementById('filtroAdomicilio').value;
    let filtroSucursalID = document.getElementById('filtroSucursalID').value.toLowerCase();

    const pedidosFiltrados = pedidosOriginales.filter(pedido =>
        (filtroPedidoID === '' || pedido.PedidoID.toString().includes(filtroPedidoID)) &&
        (filtroUsuarioID === '' || pedido.UsuarioID.toString().includes(filtroUsuarioID)) &&
        (filtroOrdenID === '' || (pedido.OrdenID ? pedido.OrdenID.toString().includes(filtroOrdenID) : false)) &&
        (filtroFechaPedido === '' || pedido.FechaPedido.toLowerCase().includes(filtroFechaPedido)) &&
        (filtroAdomicilio === '' || (pedido.Adomicilio ? 'sí' : 'no') === filtroAdomicilio) &&
        (filtroSucursalID === '' || pedido.SucursalID.toString().includes(filtroSucursalID))
    );

    mostrarPedidos(pedidosFiltrados);
}

// función que correrá cuando la página cargue
window.onload = function() {
    obtenerPedidos(); // muestra la lista completa de pedidos
    
    //event listeners en los inputs de filtro
    document.getElementById('filtroPedidoID').addEventListener('input', filtrarPedidos);
    document.getElementById('filtroUsuarioID').addEventListener('input', filtrarPedidos);
    document.getElementById('filtroOrdenID').addEventListener('input', filtrarPedidos);
    document.getElementById('filtroFechaPedido').addEventListener('input', filtrarPedidos);
    document.getElementById('filtroAdomicilio').addEventListener('change', filtrarPedidos);
    document.getElementById('filtroSucursalID').addEventListener('input', filtrarPedidos);
}