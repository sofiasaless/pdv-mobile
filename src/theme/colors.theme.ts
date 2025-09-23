export const colors = {
  azul_principal: "#1d3461",
  azul_secundario: "#237B9F",
  btn_abrir_mesa: "#b76c07",
  btn_transferir: "#3bb174",
  btn_excluir: "#e15554",
  mesa_bloqueada: "#fcdcdd",
  btn_desabilitado: "#e1e3e6ff"
};

export const fonts = {
  font_family_bold: 'Barlow-Bold',
  font_family_padrao: 'Barlow-Regular',
  font_family_medio: 'Barlow-Medium',
}

export function lightenColor(hex: string, percent: number): string {
  // remove o # se existir
  hex = hex.replace(/^#/, "");

  // parse R, G, B
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // aplica clareamento
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // retorna em formato hex
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}