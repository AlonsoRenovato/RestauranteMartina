document.getElementById("date").addEventListener("change", function () {
    let fechaSeleccionada = this.value;
    console.log("Fecha seleccionada:", fechaSeleccionada);

    let selectHora = document.getElementById("time");
    selectHora.innerHTML = "<option value=''>Cargando horarios...</option>";

    fetch("disponibilidad.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar disponibilidad.json");
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

            selectHora.innerHTML = opciones;
        })
        .catch(error => {
            console.error("Error al obtener horarios:", error);
            selectHora.innerHTML = "<option value=''>Error al cargar horarios</option>";
        });
});

// Manejo del formulario de reserva
document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recargar la página

    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let people = document.getElementById("people").value;

    if (!date || !time || people < 1) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let message = `Tu reservación para ${people} persona(s) ha sido confirmada para el ${date} a las ${time}.`;
    document.getElementById("reservationDetails").innerText = message;
    document.getElementById("confirmationMessage").style.display = "block";
});
