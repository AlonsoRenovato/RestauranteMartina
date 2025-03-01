// EL SERVIDOR SE EJECUTA EN LA LÍNEA FINAL

// importar módulos necesarios
const express = require('express'); // módulo de express
const bcrypt = require('bcryptjs'); // módulo de encriptación de contraseñas
const cors = require('cors'); // cross-origin resource sharing
const pool = require('./db'); // importa el pool de conexiones de db.js
const app = express(); // inicializa el servidor express

app.use(cors()); // usar cors en todas las rutas
app.use(express.json()); // para manejar datos tipo json

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

        console.log(rows);

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
    const { items } = req.body; // los items se almacenan desde el request

    try {
        connection = await pool.getConnection();
        if (connection) console.log('Se estableció una conexión a la base de datos para crear un pedido :)');

        const [pedido] = await connection.execute('INSERT INTO Pedido (Total) VALUES (0)'); // crear pedido
        const pedidoID = pedido.insertId;

        let totalPedido;
        for (let item of items) {
            const subtotal = item.Cantidad * item.Subtotal
            totalPedido += subtotal;
        }
    } catch {

    }
});

// EJECUTAR EL SERVIDOR
app.listen(3000, () => console.log('Servidor ejecutandose en puerto 3000!'));