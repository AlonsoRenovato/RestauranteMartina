document.getElementById("sucursal").addEventListener("change", function () {
    let sucursalSeleccionada = this.value;
    console.log("Sucursal seleccionada:", sucursalSeleccionada);

    let fechaInput = document.getElementById("date");
    let horaSelect = document.getElementById("time");

    fechaInput.value = ""; // Resetea la fecha cuando cambia la sucursal
    horaSelect.innerHTML = "<option value=''>Selecciona una fecha primero</option>";
});

// Evento cuando cambia la fecha
document.getElementById("date").addEventListener("change", function () {
    let fechaSeleccionada = this.value;
    let sucursalSeleccionada = document.getElementById("sucursal").value;
    let horaSelect = document.getElementById("time");

    if (!sucursalSeleccionada) {
        alert("Por favor, selecciona una sucursal primero.");
        fechaSeleccionada.value = "";
        return;
    }

    console.log("Fecha seleccionada:", fechaSeleccionada);
    
    horaSelect.innerHTML = "<option value=''>Cargando horarios...</option>";

    // Construye la URL del JSON según la sucursal elegida
    let jsonUrl = `disponibilidad_${sucursalSeleccionada}.json`;

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar disponibilidad");
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos JSON recibidos:", data);
            let horariosDisponibles = data.disponibilidad.filter(slot => slot.fecha === fechaSeleccionada);
            console.log("Horarios filtrados:", horariosDisponibles);

            let opciones = horariosDisponibles.length > 0
                ? horariosDisponibles.map(slot => `<option value="${slot.hora}">${slot.hora} - ${slot.mesas_disponibles} mesas disponibles</option>`).join("")
                : "<option value=''>No hay disponibilidad</option>";

            horaSelect.innerHTML = opciones;
        })
        .catch(error => {
            console.error("Error al obtener horarios:", error);
            horaSelect.innerHTML = "<option value=''>Error al cargar horarios</option>";
        });
});

document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    let sucursal = document.getElementById("sucursal").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let people = document.getElementById("people").value;

    if (!sucursal || !date || !time || people < 1) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Construye el mensaje de confirmación
    let sucursalCapitalizada = sucursal.charAt(0).toUpperCase() + sucursal.slice(1).toLowerCase();

    let message = `Tu reservación para ${people} persona(s) ha sido confirmada en la sucursal ${sucursalCapitalizada} para el ${date} a las ${time}.`;
    
    // Muestra el mensaje de confirmación
    document.getElementById("reservationDetails").innerText = message;
    document.getElementById("confirmationMessage").style.display = "block";
});
