// importar módulos necesarios
const express = require('express'); // módulo de express
const connectToDatabase = require('./db.js'); // se importa la función de db.js
const bcrypt = require('bcryptjs'); // módulo de encriptación de contraseñas
const cors = require('cors'); // cross-origin resource sharing

const app = express(); // inicializa el servidor express

app.use(cors()); // usar cors en todas las rutas
app.use(express.json()); // para manejar datos tipo json

let connection; // Variable para guardar la conexión a la base de datos

// establecer la conexión a la base de datos usando la función de db.js
connectToDatabase().then(dbConnection => {
    connection = dbConnection; // Asignamos la conexión a la variable global
    if (connection) {
        console.log('Se estableció la conexión a la base de datos :)')
    }
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

// establece la ruta de la raíz, o sea ejecuta el servidor
app.get('/', (req, res) => {
    res.send('Hola, el servidor está en ejecución.');
});

app.listen(3000, () => console.log('Server running on port 3000!'));

// ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { correoElectronico, contrasena } = req.body;

    try {
        // consulta para buscar al usuario por correo electrónico
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
    }
});

// ruta para ver pedidos
app.get('/pedidos', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM Pedido');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
});