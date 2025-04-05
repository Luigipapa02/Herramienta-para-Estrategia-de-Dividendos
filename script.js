// Cálculo de dividendo neto actual
document.getElementById("calcular").addEventListener("click", function () {
    const cantidadCedears = parseFloat(document.getElementById("cedears").value);
    const ratio = parseFloat(document.getElementById("ratio").value);
    const dividendo = parseFloat(document.getElementById("dividendo").value);

    if (isNaN(cantidadCedears) || isNaN(ratio) || isNaN(dividendo)) {
        document.getElementById("resultado").textContent = "Por favor, completá todos los campos correctamente.";
        return;
    }

    const acciones = cantidadCedears / ratio;
    const dividendoBrutoAnual = dividendo * acciones * 4;
    const dividendoNeto = dividendoBrutoAnual * 0.738;

    document.getElementById("resultado").textContent = `Vas a recibir aproximadamente USD $${dividendoNeto.toFixed(2)} netos al año.`;
});

// Simulador de dividendos futuros
document.getElementById("simular").addEventListener("click", function () {
    const cantidadInicial = parseFloat(document.getElementById("sim_cedears").value);
    const ratio = parseFloat(document.getElementById("sim_ratio").value);
    const dividendoInicial = parseFloat(document.getElementById("sim_dividendo").value);
    const crecimiento = parseFloat(document.getElementById("sim_growth").value) / 100;
    const aporteMensual = parseFloat(document.getElementById("sim_aporte").value);
    const anios = parseInt(document.getElementById("sim_anios").value);

    if (isNaN(cantidadInicial) || isNaN(ratio) || isNaN(dividendoInicial) || isNaN(crecimiento) || isNaN(aporteMensual) || isNaN(anios)) {
        alert("Por favor, completá todos los campos correctamente.");
        return;
    }

    let resultados = [];
    let totalCedears = cantidadInicial;
    let dividendo = dividendoInicial;

    for (let i = 1; i <= anios; i++) {
        totalCedears += aporteMensual * 12;
        dividendo *= (1 + crecimiento);

        const acciones = totalCedears / ratio;
        const dividendoAnual = dividendo * acciones * 4;
        const dividendoNeto = dividendoAnual * 0.738;

        resultados.push({
            anio: i,
            cedears: Math.floor(totalCedears),
            dividendoNeto: dividendoNeto.toFixed(2)
        });
    }

    renderizarTabla(resultados);
    renderizarGrafico(resultados);
});

function renderizarTabla(data) {
    const tbody = document.querySelector("#tabla-simulacion tbody");
    tbody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.anio}</td>
            <td>${row.cedears}</td>
            <td>USD $${row.dividendoNeto}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderizarGrafico(data) {
    const ctx = document.getElementById("grafico").getContext("2d");

    if (window.miGrafico) {
        window.miGrafico.destroy();
    }

    window.miGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => `Año ${d.anio}`),
            datasets: [{
                label: 'Dividendos Anuales Netos (USD)',
                data: data.map(d => d.dividendoNeto),
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
