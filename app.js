async function iniciarSesion() {
    event.preventDefault();
    console.log('hola');
    const correoElectronico = document.getElementById('email').value
    const contrasena = document.getElementById('password').value

    try {
        const respuesta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correoElectronico, contrasena })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            console.log('Inicio de sesión exitoso', data);
            window.location.href = 'pedidos.html'
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error en la solicitud', error);
    }
}