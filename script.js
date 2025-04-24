async function converterMoeda() {
  const de = document.getElementById("fromCurrency").value;
  const para = document.getElementById("toCurrency").value;
  const valor = parseFloat(
    document.getElementById("amount").value.replace(",", ".")
  );

  if (isNaN(valor)) {
    document.getElementById("resultadoTexto").innerText =
      "Digite um valor válido.";
    return;
  }

  if (de === para) {
    document.getElementById(
      "resultadoTexto"
    ).innerText = `Valor convertido: ${valor.toFixed(2)} ${para}`;
    return;
  }

  try {
    const endpoint = `https://economia.awesomeapi.com.br/json/last/${de}-${para}`;
    const resposta = await fetch(endpoint);
    const dados = await resposta.json();

    const chave = `${de}${para}`;
    const cotacao = parseFloat(dados[chave].bid);

    const resultado = valor * cotacao;
    document.getElementById(
      "resultadoTexto"
    ).innerText = `Valor convertido: ${resultado.toFixed(2)} ${para}`;
  } catch (erro) {
    document.getElementById("resultadoTexto").innerText = "Erro na conversão.";
    console.error("Erro ao buscar cotação:", erro);
  }
}
