// importar el módulo mysql2
const mysql = require('mysql2/promise');

// establecer conexión con la base de datos
async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: '69.49.241.64',
            user: 'siulabc1_davsiu', // tu usuario
            password: 'registro1313', // tu contraseña
            database: 'siulabc1_proyectoFullstack'
        });
        return connection; // devolver la conexión para usarla en otras partes de la app
    } catch (error) {
        console.error('Database connection failed: ', error);
    }
} 

module.exports = connectToDatabase; // se exporta la función para correrla en otros archivos