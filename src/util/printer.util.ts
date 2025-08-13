import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { Mesa } from "../types/mesa.type";
import { ItemPedido } from "../types/itemPedido.type";

export async function imprimirPedidosDaMesa(mesa: Mesa) {
  try {
    const html = gerarHtmlPedidos(mesa);

    // Gera o PDF
    const { uri } = await Print.printToFileAsync({ html });

    // Compartilha
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("Erro ao gerar ou compartilhar o PDF:", error);
  }
};

function gerarHtmlPedidos(mesa: Mesa) {
  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR");
  const horaFormatada = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const horarioCompleto = `${dataFormatada} às ${horaFormatada}`;

  const pedidosAgrupados = agruparItens(mesa.pedidos)

  const listaHtml = pedidosAgrupados
    .map(
      (pedido) => `
          <div style="display: flex; justify-content: space-between; font-size: 14mm; margin-bottom: 6mm;">
            <div>
              <strong>${pedido.quantidade}x</strong> ${pedido.descricao}
            </div>
            <div>
              <strong>${(pedido.quantidade * pedido.preco).toFixed(2)}</strong>
            </div>
          </div>`
    )
    .join("");

  const totalGeral = pedidosAgrupados.reduce(
    (soma, pedido) => soma + (pedido.preco * pedido.quantidade),
    0
  );

  return `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="font-family: Helvetica Neue, sans-serif; padding: 10mm; color: #000;">
      <div style="text-align: center; margin-bottom: 6mm;">
        <div style="font-size: 15mm; font-weight: bold; letter-spacing: 1mm;">
          CHURRASCARIA
        </div>
        <div style="font-size: 21mm; font-weight: bold; color: #333;">
          <span style="border-bottom: 1px solid #000; padding-bottom: 1mm;">SEU WILSON</span>
        </div>
      <div>
      <div style="font-size: 12mm; margin-top: 2mm; color: #333; font-weight: bold;">
        R. Dom Lucas, 539 - Campo Velho
      </div>
      <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; margin-top: 5mm;">
        <div style="font-size: 12mm; margin-top: 2mm; color: #333; font-weight: bold;">
          Mesa ${mesa.numeracao}
      </div>
      <div style="font-size: 12mm; margin-top: 2mm; color: #333; font-weight: bold;">
        ${horarioCompleto}
      </div>
    </div>
    </div>
    </div>

    <div style="border-top: 1px solid #000; margin-bottom: 4mm;"></div>
      <div style="display: flex; flex-direction: row; justify-content: space-between; font-weight: bold; font-size: 12mm; margin-bottom: 2mm; border-bottom: 1px solid #000;">
      <div style="width: 15%; text-align: left;">QTD</div>
      <div style="width: 55%; text-align: left;">ITEM</div>
      <div style="width: 30%; text-align: right;">VALOR</div>
    </div>
      ${listaHtml}
    <div style="border-top: 1px dashed #000; margin-top: 6mm; margin-bottom: 4mm;"></div>

    <div style="text-align: right; font-size: 15mm; font-weight: bold;">
      Total: R$ ${totalGeral.toFixed(2)}
    </div>

    <div style="text-align: center; margin-top: 8mm;">
      <div style="font-size: 12mm;">Obrigado pela preferencia!</div>
      <div style="font-size: 12mm;">Volte sempre!</div>
      <div style="font-size: 12mm; margin-top: 3mm; margin-bottom: 10mm;">Um serviço © UpBusiness</div>
      <div style="border-top: 1px dashed #000; margin-top: 8mm;"></div>
    </div>
    </body>
  </html>
  `;
}

function agruparItens(itens: ItemPedido[]): ItemPedido[] {
  const agrupados: Record<string, ItemPedido> = {};

  for (const item of itens) {
    const chave = item.id_produto ?? item.descricao; // usa id_produto ou descricao como chave

    if (!agrupados[chave]) {
      agrupados[chave] = { ...item };
    } else {
      agrupados[chave].quantidade += item.quantidade;
      agrupados[chave].total = (agrupados[chave].preco ?? 0) * agrupados[chave].quantidade;
    }
  }

  return Object.values(agrupados);
}