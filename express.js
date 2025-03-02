// EL SERVIDOR SE EJECUTA EN LA LÍNEA FINAL

// importar módulos necesarios
const express = require('express'); // módulo de express
const bcrypt = require('bcryptjs'); // módulo de encriptación de contraseñas
const cors = require('cors'); // cross-origin resource sharing
const pool = require('./db'); // importa el pool de conexiones de db.js
const app = express(); // inicializa el servidor express

app.use(express.json()); // para manejar datos tipo json

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// establece la ruta de la raíz, o sea lo que pasa cuando se ejecuta el servidor
app.get('/', (req, res) => {
    res.send('Hola, el servidor está en ejecución.');
});

// ruta para iniciar sesión
app.post('/login', async (req, res) => {
    let connection;
    const { correoElectronico, contrasena } = req.body;

    try {
        connection = await pool.getConnection(); // obtiene una conexión del pool
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener los administradores :)');
        const [rows] = await connection.execute('SELECT * FROM Administrador WHERE (CorreoElectronico) = ?',
        [correoElectronico]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario administrador no encontrado' })
        }

        const usuarioAdmin = rows[0];
        
        const contrasenaValida = contrasena === usuarioAdmin.Contrasena;

        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Contraseña incorrecta'})
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', usuarioAdmin });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });

    } finally {
        if (connection) connection.release();
    }
});

// ruta para obtener pedidos
app.get('/pedidos', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener los pedidos :)');
        const [rows] = await connection.execute('SELECT * FROM Pedido');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    } finally {
        if (connection) connection.release();
    }
});

// ruta para obtener desayunos del menú
app.get('/desayunos', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener los desayunos :)');
        const [rows] = await connection.execute('SELECT * FROM MenuItem WHERE Cat = ?', ['Desayuno']);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los desayunos' });
    } finally {
        if (connection) connection.release();
    }
});

// ruta para obtener las comidas del menú
app.get('/comidas', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); 
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener las comidas :)');
        const [rows] = await connection.execute('SELECT * FROM MenuItem WHERE Cat = ?', ['Comida']);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las comidas' });
    } finally {
        if (connection) connection.release();
    }
});

// ruta para obtener postres del menú
app.get('/postres', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); 
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener los postres :)');
        const [rows] = await connection.execute('SELECT * FROM MenuItem WHERE Cat = ?', ['Postre']);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los postres' });
    } finally {
        if (connection) connection.release();
    }
});

// ruta para obtener bebidas del menú
app.get('/bebidas', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(); 
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener las bebidas :)');
        const [rows] = await connection.execute('SELECT * FROM MenuItem WHERE Cat = ?', ['Bebida']);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las bebidas' });
    } finally {
        if (connection) connection.release();
    }
});

// ruta para obtener una sucursal específica
app.get('/sucursales/:nombre?', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener una sucursal');

        const { nombre } = req.params; // capturar el nombre de la sucursal que se busca si existe
        let query = 'SELECT * FROM Sucursal'; // este es el query default
        let values = [];

        if (nombre) {
            query += ' WHERE Sucursal = ?'; // esto se le añade al query default si se busca una sucursal específica
            values.push(nombre);
        }

        const [rows] = await connection.execute(query, values);

        if (rows.length === 0) {
            console.log(`La sucursal buscada no salió en la base de datos`);
            return res.status(404).json({ message: 'Sucursal no encontrada' }); // respuesta para el front end
        }

        console.log('Sucursal(es) obtenidas:', rows);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        if (connection) connection.release();
    }
});

// ruta para crear un pedido
app.post('/crearPedido', async (req, res) => {
    console.log('Datos recibidos en el backend:', req.body); // esto se muestra para saber si los datos están llegando

    // los parámetros deben estar en su formato adecuado para introducirlos en los queries
    const { ADomicilio, SucursalID, carrito, costoTotal } = req.body;

    console.log('¿A domicilio?:', ADomicilio);
    console.log('Sucursal ID:', SucursalID);
    console.log('Carrito:', carrito);
    console.log('Costo total:', costoTotal);

    if (ADomicilio === undefined || ADomicilio === null) { console.log('falta el modo de entrega.') };
    if (!SucursalID) { console.log('falta la sucursal.') };
    if (!carrito || carrito.length === 0) { console.log('falta el carrito o el carrito no tiene items.') };
    if (!costoTotal) { console.log('falta el costo total.') };

    if (ADomicilio === undefined || ADomicilio === null || !SucursalID || !carrito || carrito.length === 0 || !costoTotal) {
        return res.status(400).json({ message: 'Faltan parámetros necesarios para crear el pedido.' });
    }

    let connection;

    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para crear un pedido :)');

        // paso 1: crear el pedido en la tabla Pedido
        const sqlQuery = ('INSERT INTO Pedido (ADomicilio, SucursalID, Total) VALUES (?, ?, ?)');
        const valoresPedido = [ADomicilio, SucursalID, costoTotal];

        const [result] = await connection.execute(sqlQuery, valoresPedido);
        console.log('Inserción de pedido realizada con éxito');
        const PedidoID = result.insertId;

        const queryPedido = 'SELECT * FROM Pedido WHERE PedidoID = ?';
        const [pedido] = await connection.execute(queryPedido, [PedidoID]);

        console.log('Pedido creado:', pedido);

        // paso 2: registrar los productos en la tabla Pedido_MenuItem
        const insertMenuItemSQL = 'INSERT INTO Pedido_MenuItem (PedidoID, MenuItemID, Cantidad, Subtotal) VALUES (?, ?, ?, ?)';

        for (let item of carrito) {
            const { MenuItemID, Cantidad, Subtotal } = item;
            console.log('Item actual:', item);
            const valoresMenuItem = [PedidoID, MenuItemID, Cantidad, Subtotal];
            await connection.execute(insertMenuItemSQL, valoresMenuItem);
        }
        console.log('Se crearon todos los registros de Pedido_MenuItem');

        res.status(201).json({ success: true, message: 'Pedido creado con éxito', Pedido: pedido[0] });

    } catch (error) {
        console.error('Error al crear pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    } finally {
        if (connection) connection.release();
    }
});

// ELIMINAR PEDIDO
app.post('/eliminarPedido', async (req, res) => {
    console.log('Se llamó la ruta de eliminar pedido. datos recibidos:', req.body);

    const { pedido } = req.body;

    if (!pedido.PedidoID) {
        console.log('Falta el ID del pedido.');
    } else {
        console.log('PedidoID recibido:', pedido.PedidoID);
    }

    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para borrar un pedido :)');

        const queryItems = 'DELETE FROM Pedido_MenuItem WHERE PedidoID = ?';
        await connection.execute(queryItems, [pedido.PedidoID]);
        console.log('Se eliminaron los items del pedido.');

        const queryPedido = 'DELETE FROM Pedido WHERE PedidoID = ?';
        const [result] = await connection.execute(queryPedido, [pedido.PedidoID]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el pedido a eliminar.' });
        }

        console.log('Pedido eliminado con éxito.');
        res.status(200).json({ success: true, message: 'Pedido eliminado con éxito.' });
    } catch (error) {
        console.error('Error al borrar pedido:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } finally {
        if (connection) connection.release();
    }
});

// CONFIRMAR PEDIDO
app.post('/setStatusPedido/:confirm?', async (req, res) => {
    console.log('Se llamó la ruta de confirmar o desconfirmar pedido. datos recibidos:', req.body);

    const { PedidoID } = req.body;

    if (!PedidoID) {
        console.log('Falta el ID del pedido.');
        return res.status(400).json({ message: 'Falta el ID del pedido' });
    } else {
        console.log('PedidoID recibido:', PedidoID);
    }

    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para confirmar un pedido :)');

        const isConfirmado = req.params.confirm === '0' ? 0 : 1;
        console.log(`El pedido se establecerá en ${isConfirmado ? 'confirmado' : 'no confirmado'}`);

        const query = 'UPDATE Pedido SET isConfirmado = ? WHERE PedidoID = ?'; // query default
        const [rows] = await connection.execute(query, [isConfirmado, PedidoID]);

        if (rows.affectedRows === 0) {
            console.log('El pedido no se encontró en la base de datos.');
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Pedido actualizado correctamente' });
    } catch (error) {
        console.error('Error al confirmar pedido:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } finally {
        if (connection) connection.release(); 
    }
});

// OBTENER ITEMS DE UN PEDIDO
app.get('/getPedidoItems', async (req, res) => {
    console.log('Se llamó la ruta de obtener los items de un pedido. datos recibidos:', req.body);

    const { PedidoID } = req.body;

    if (!PedidoID) {
        console.log('Falta el ID del pedido.');
    } else {
        console.log('PedidoID recibido:', PedidoID);
    }

    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para obtener los items de un pedido');

        const query = `
            SELECT 
                pmi.PedidoID, 
                pmi.MenuItemID, 
                mi.Nombre AS ItemNombre, 
                pmi.Cantidad, 
                pmi.Subtotal
            FROM 
                Pedido_MenuItem pmi
            JOIN 
                MenuItem mi ON pmi.MenuItemID = mi.MenuItemID
            WHERE 
                pmi.PedidoID = ?`;

        // Ejecutamos la consulta pasando el PedidoID
        const [rows] = await connection.execute(query, [PedidoID]);

        if (rows.length === 0) {
            console.log('No se encontraron items para el pedido.');
            return res.status(404).json({ success: false, message: 'No se encontraron items para el pedido' });
        }

        console.log('Items obtenidos:', rows);
        res.status(200).json({ success: true, items: rows });
    } catch (error) {
        console.error('Error al obtener items:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } finally {
        if (connection) connection.release();
    }
})

// ELIMINAR PEDIDO POR ID
app.delete('/eliminarPedidoPorId', async (req, res) => {
    console.log('Se llamó a la ruta de eliminar un pedido. Datos recibidos:', req.body);

    const { PedidoID } = req.body;

    if (!PedidoID) {
        console.log('Falta el ID del pedido.');
        return res.status(400).json({ success: false, message: 'Falta el ID del pedido.' });
    } else {
        console.log('PedidoID recibido:', PedidoID);
    }

    let connection;
    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para eliminar el pedido');

        await connection.beginTransaction();

        // Eliminar los items del pedido (de la tabla intermedia Pedido_MenuItem)
        const deleteItemsQuery = `
            DELETE FROM Pedido_MenuItem 
            WHERE PedidoID = ?;
        `;
        await connection.execute(deleteItemsQuery, [PedidoID]);

        // Eliminar el pedido (de la tabla principal Pedido, si existe)
        const deletePedidoQuery = `
            DELETE FROM Pedido 
            WHERE PedidoID = ?;
        `;
        await connection.execute(deletePedidoQuery, [PedidoID]);

        // Hacer commit de la transacción
        await connection.commit();

        console.log('Pedido eliminado con éxito.');
        res.status(200).json({ success: true, message: 'Pedido eliminado con éxito.' });

    } catch (error) {
        // Si algo sale mal, revertir la transacción
        if (connection) await connection.rollback();
        
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } finally {
        if (connection) connection.release();
    }
});

// EJECUTAR EL SERVIDOR
app.listen(3000, () => console.log('Servidor ejecutandose en puerto 3000!'));