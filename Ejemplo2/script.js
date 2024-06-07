
function calcular() {
    const expression = document.getElementById("expression").value;
    try {
        let resultado = EJEMPLO2.parse(expression);
        document.getElementById("resultado").innerText = "Resultado: " + resultado;
    } catch (error) {
        document.getElementById("resultado").innerText = "Error: " + error.message;
    }
}
