import { converterParaDataLocal } from "./converterParaDataLocal";

export const calcularDiferencaDias = (data_alvo, data_criacao, tipo) => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  let diferencaMilissegundos = 0;
  if (tipo === "r") {
    const dataRef = converterParaDataLocal(data_alvo);
    diferencaMilissegundos = dataRef.getTime() - hoje.getTime();
  } else {
    const dataRef = converterParaDataLocal(data_criacao);
    diferencaMilissegundos = hoje.getTime() - dataRef.getTime();
  }
  const dias = Math.round(diferencaMilissegundos / (1000 * 60 * 60 * 24));
  return dias < 0 ? 0 : dias;
};
