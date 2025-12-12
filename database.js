async function buscarUsuario() {
    const valor = document.getElementById("buscar-usuario").value.trim().toLowerCase();
    const box = document.getElementById("resultado-busqueda");

    if (!valor) {
        alert("Ingresa un ID, nombre o Discord.");
        return;
    }

    box.classList.add("hidden");

    // BUSCAR
    const ref = db.collection("usuarios");
    const coincidencias = await ref
        .where("busqueda", "array-contains", valor)
        .get();

    if (coincidencias.empty) {
        box.classList.remove("hidden");
        box.innerHTML = `
            <h2>Sin resultados</h2>
            <p>No se encontró al usuario.</p>
        `;
        return;
    }

    const data = coincidencias.docs[0].data();
    box.classList.remove("hidden");

    // INFO GENERAL
    document.getElementById("db-info-usuario").innerHTML = `
        <div class="db-section">
            <p><strong>Nombre:</strong> ${data.nombre || "No registrado"}</p>
            <p><strong>Discord:</strong> ${data.discord || "No registrado"}</p>
            <p><strong>Roblox:</strong> ${data.roblox || "No registrado"}</p>
            <p><strong>Steam:</strong> ${data.steam || "No registrado"}</p>
            <p><strong>Estado:</strong> ${data.estado || "Sin estado"}</p>
        </div>
    `;

    // ARCHIVOS
    document.getElementById("db-archivos").innerHTML =
        data.archivos?.length
            ? data.archivos.map(a => `
                <p>📄 <strong>${a.tipo}</strong> — ${a.motivo}  
                <br><small>${a.fecha}</small> — <i>${a.staff}</i></p>
              `).join("")
            : `<p class="db-empty">Sin archivos registrados.</p>`;

    // KICKS
    document.getElementById("db-kicks").innerHTML =
        data.kicks?.length
            ? data.kicks.map(k => `
                <p>⚠️ ${k.razon}  
                <br><small>${k.fecha}</small> — <i>${k.staff}</i></p>
              `).join("")
            : `<p class="db-empty">Sin kicks.</p>`;

    // BANEOS
    document.getElementById("db-baneos").innerHTML =
        data.bansDiscord?.length || data.bansRoblox?.length
            ? `
                ${data.bansDiscord?.map(b => `
                    <p>⛔ <strong>Discord</strong> — ${b.razon}  
                    <br><small>${b.fecha}</small> — <i>${b.staff}</i>
                    <br>Estado: ${b.estado}
                    <br>Pruebas: <a href="${b.pruebas}" target="_blank">${b.pruebas}</a></p>
                `).join("") || ""}

                ${data.bansRoblox?.map(b => `
                    <p>⛔ <strong>Roblox</strong> — ${b.razon}  
                    <br><small>${b.fecha}</small> — <i>${b.staff}</i>
                    <br>Estado: ${b.estado}
                    <br>Pruebas: <a href="${b.pruebas}" target="_blank">${b.pruebas}</a></p>
                `).join("") || ""}
              `
            : `<p class="db-empty">Sin baneos.</p>`;

    // APELACIONES
    document.getElementById("db-apelaciones").innerHTML =
        data.apelaciones?.length
            ? data.apelaciones.map(a => `
                <p>📬 <strong>${a.tipo}</strong>  
                <br>${a.motivo}
                <br><small>${a.fecha}</small> — Estado: ${a.estado}
                <br>Pruebas: <a href="${a.pruebas}" target="_blank">${a.pruebas}</a></p>
              `).join("")
            : `<p class="db-empty">Sin apelaciones.</p>`;
}
