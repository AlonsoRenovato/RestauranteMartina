document.getElementById("sucursal").addEventListener("change", function () {
    let sucursalSeleccionada = this.value;
    console.log("Sucursal seleccionada:", sucursalSeleccionada);

    let fechaInput = document.getElementById("date");
    let horaSelect = document.getElementById("time");
    let peopleSelect = document.getElementById("people");

    fechaInput.value = ""; // Resetea la fecha cuando cambia la sucursal
    horaSelect.innerHTML = "<option value=''>Selecciona una fecha primero</option>";    
    peopleSelect.innerHTML = "<option value=''>Selecciona una hora primero</option>";
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

            // Siempre agrega la opción inicial antes de los horarios disponibles
            let opciones = `<option value="" selected>Selecciona una fecha</option>`;

            if (horariosDisponibles.length > 0) {
            opciones += horariosDisponibles.map(slot => 
            `<option value="${slot.hora}">${slot.hora} - ${slot.mesas_disponibles} mesas disponibles</option>`
            ).join("");
        } else {
    opciones += "<option value=''>No hay disponibilidad</option>";
}

            horaSelect.innerHTML = opciones;
        })
        .catch(error => {
            console.error("Error al obtener horarios:", error);
            horaSelect.innerHTML = "<option value=''>Error al cargar horarios</option>";
        });
});

// Evento cuando cambia la hora para actualizar número de personas
document.getElementById("time").addEventListener("change", function () {
    let selectedOption = this.options[this.selectedIndex];
    let mesasDisponibles = selectedOption.getAttribute("data-mesas");
    let peopleSelect = document.getElementById("people");

    if (!mesasDisponibles || mesasDisponibles === "null") {
        peopleSelect.innerHTML = "<option value=''>Selecciona una hora primero</option>";
        return;
    }

    let maxPersonas = mesasDisponibles * 4; // Suponiendo 4 personas por mesa
    let opcionesPersonas = "";

    for (let i = 1; i <= maxPersonas; i++) {
        opcionesPersonas += `<option value="${i}">${i} persona${i > 1 ? 's' : ''}</option>`;
    }

    peopleSelect.innerHTML = opcionesPersonas;
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

    // Capitaliza la primera letra de la sucursal
    let sucursalCapitalizada = sucursal.charAt(0).toUpperCase() + sucursal.slice(1).toLowerCase();

    // Construcción del mensaje de confirmación
    let message = `
        <div class="animated-confirmation">
            <h3 class="animated-check">✅ ¡Reservación Confirmada!</h3>
            <p><strong>Sucursal:</strong> ${sucursalCapitalizada}</p>
            <p><strong>Fecha:</strong> ${date}</p>
            <p><strong>Hora:</strong> ${time}</p>
            <p><strong>Número de personas:</strong> ${people}</p>
            <p>🎉 <span class="confetti">¡Te esperamos en <strong>Restaurante Martina</strong>!</span></p>
            <button onclick="downloadConfirmation()" class="download-btn">Descargar Confirmación</button>
        </div>
    `;

    // Asegurar que solo se muestre una vez
    let confirmationBox = document.getElementById("confirmationMessage");
    document.getElementById("reservationDetails").innerHTML = message;

    confirmationBox.style.display = "block";
    confirmationBox.style.opacity = "0";

    setTimeout(() => {
        confirmationBox.style.opacity = "1";
    }, 200);
});

// Función para descargar la confirmación en PDF
function downloadConfirmation() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let sucursal = document.getElementById("sucursal").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let people = document.getElementById("people").value;

    let sucursalCapitalizada = sucursal.charAt(0).toUpperCase() + sucursal.slice(1).toLowerCase();

    let img = new Image();
    img.src = "assets/img/LogoRestauranteMartina.jpg"; // Ruta local de la imagen dentro del proyecto
    img.onload = function () {
        doc.addImage(img, "JPEG", 75, 10, 60, 60); // X, Y, Ancho, Alto

    let yOffset = 65;

    // Título de la confirmación
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("¡Reservación Confirmada!", 20, yOffset);

    // Línea de separación
    doc.setDrawColor(150); // Color gris
    doc.line(20, yOffset + 5, 190, yOffset + 5); // Línea de separación

    // Datos de la reservación
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text(`Sucursal: ${sucursalCapitalizada}`, 20, yOffset + 20);
    doc.text(`Fecha: ${date}`, 20, yOffset + 30);
    doc.text(`Hora: ${time}`, 20, yOffset + 40);
    doc.text(`Número de personas: ${people}`, 20, yOffset + 50);

    // Mensaje de despedida
    doc.setFont("helvetica", "bold");
    doc.setTextColor(200, 50, 100);
    doc.text("¡Te esperamos en Restaurante Martina!", 20, yOffset + 70);

    // Guardar el PDF
    doc.save("Confirmacion_Reservacion.pdf");
    };
}

// Actualiza el contenido de la confirmación
document.getElementById("confirmedSucursal").innerText = sucursalCapitalizada; {
document.getElementById("confirmedFecha").innerText = date;
document.getElementById("confirmedHora").innerText = time;
document.getElementById("confirmedPersonas").innerText = people;

// Muestra el mensaje de confirmación con animación
document.getElementById("confirmationMessage").style.display = "block";
};

// Mostrar mensaje en la caja de confirmación
document.getElementById("reservationDetails").innerHTML = message; {
document.getElementById("confirmationMessage").style.display = "block";
};

// Hacer visible el botón de descargar PDF
document.getElementById("downloadPDF").style.display = "inline-block"; {
document.getElementById("downloadPDF").addEventListener("click", downloadConfirmation);
};