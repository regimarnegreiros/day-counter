export const gerarPaletaCores = (hue) => {
  return {
    corFundo: `hsl(${hue}, 80%, 90%)`,
    corBadge: `hsl(${hue}, 80%, 80%)`,
    corBarra: `hsl(${hue}, 80%, 50%)`,
  };
};
