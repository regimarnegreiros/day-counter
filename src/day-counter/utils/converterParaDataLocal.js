export const converterParaDataLocal = (dateInput) => {
  if (!dateInput) return new Date();
  const dataStr = typeof dateInput === "string" ? dateInput : dateInput.toISOString();
  const apenasData = dataStr.includes("T") ? dataStr.split("T")[0] : dataStr;
  const [ano, mes, dia] = apenasData.split("-");
  return new Date(Number(ano), Number(mes) - 1, Number(dia));
};
