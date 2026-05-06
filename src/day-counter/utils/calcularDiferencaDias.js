export const calcularDiferencaDias = (data_alvo, data_criacao, tipo) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  let diferencaMilissegundos = 0;
  if (tipo === "r") {
    const dataRef = new Date(data_alvo);
    dataRef.setHours(0, 0, 0, 0);
    diferencaMilissegundos = dataRef.getTime() - hoje.getTime();
  } else {
    const dataRef = new Date(data_criacao);
    dataRef.setHours(0, 0, 0, 0);
    diferencaMilissegundos = hoje.getTime() - dataRef.getTime();
  }
  const dias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));
  return dias < 0 ? 0 : dias;
};
