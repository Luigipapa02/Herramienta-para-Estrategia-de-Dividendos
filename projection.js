function calcularProyeccion(cedear, anios) {
  let historial = [];

  let totalCedears = cedear.cantidad;
  let dividendo = cedear.dividendoActual;
  const ratio = cedear.ratio;
  const comprasMensuales = cedear.compraMensual;

  for (let año = 1; año <= anios; año++) {
    // Sumar CEDEARs por las compras del año
    totalCedears += comprasMensuales * 12;

    // Dividendo por acción con crecimiento
    if (año > 1) {
      dividendo *= 1 + (cedear.crecimientoAnualDividendo / 100);
    }

    // Calculo de dividendos netos
    const acciones = totalCedears / ratio;
    const bruto = acciones * dividendo * 12;
    const netoUSA = bruto * 0.7;
    const netoArg = netoUSA * 0.93;

    historial.push({
      año: año,
      totalCedears: totalCedears,
      dividendoAnualPorAccion: dividendo.toFixed(2),
      dividendosNetosUSD: netoArg.toFixed(2)
    });
  }

  return historial;
}
