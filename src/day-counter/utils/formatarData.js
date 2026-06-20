const formatadorData = new Intl.DateTimeFormat("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" });

export const formatarData = (date) => {
  if (!date) return "";
  return formatadorData.format(date);
};
