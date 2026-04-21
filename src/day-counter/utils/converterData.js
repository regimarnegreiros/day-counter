export const converterData = (data) => {
  const partes = data.split("/");
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);
  return new Date(ano, mes, dia);
};
