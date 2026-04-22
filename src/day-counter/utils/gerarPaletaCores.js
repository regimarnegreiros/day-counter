export const gerarPaletaCores = (hue) => {
  return {
    corFundo: `hsl(${hue}, 80%, 90%)`,
    corBadge: `hsl(${hue}, 80%, 70%)`,
    corBarra: `hsl(${hue}, 80%, 50%)`,
  };
};
