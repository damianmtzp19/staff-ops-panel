/* ========== ESTADO DEL STAFF ========== */
let staffEstado = "Fuera de Servicio";

function setEstado(nuevo) {
    staffEstado = nuevo;
    document.getElementById("estadoStaff").innerText = nuevo;

    if (nuevo === "En Servicio") {
        iniciarCronometro();
    } else {
        detenerCronometro();
    }
}

/* ========== CRONÓMETRO ========== */
let cronInterval;
let segundos = 0;

function iniciarCronometro() {
    detenerCronometro();
    cronInterval = setInterval(() => {
        segundos++;
        document.getElementById("cronometro").innerText = formatTiempo(segundos);
    }, 1000);
}

function detenerCronometro() {
    clearInterval(cronInterval);
}

function formatTiempo(sec) {
    let h = Math.floor(sec / 3600);
    let m = Math.floor((sec % 3600) / 60);
    let s = sec % 60;

    return `${h}h ${m}m ${s}s`;
}

/* ========== REGISTROS ========== */
function agregarRegistro(tipo) {
    let usuario = prompt("Usuario:");
    let id = prompt("ID:");
    let motivo = prompt("Motivo:");
    let pruebas = prompt("Pruebas (links):");
    let añadidoPor = localStorage.getItem("usuarioActivo") || "Desconocido";

    let tabla = document.getElementById(tipo);
    if (!tabla) return alert("Error crítico: tabla no existe.");

    let fila = `
    <tr>
        <td>${usuario}</td>
        <td>${id}</td>
        <td>${motivo}</td>
        <td>${pruebas}</td>
        <td>📌 Añadido por: <b>${añadidoPor}</b></td>
    </tr>
    `;

    tabla.innerHTML += fila;
}
