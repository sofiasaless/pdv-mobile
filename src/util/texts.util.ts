import { HistoricoMesa } from "../types/historicoMesa.type"
import { ItemPedido } from "../types/itemPedido.type"

export function dataFirebaseParaDataNormal(dataFirebase: any) {
  if (dataFirebase === '') {
    return ''
  }
  return new Date(dataFirebase.seconds * 1000).toLocaleTimeString()
}

export function dataFirebaseParaDataNormalExtensa(dataFirebase: any) {
  if (dataFirebase === '') {
    return ''
  }
  return new Date(dataFirebase.seconds * 1000).toLocaleDateString() + ' às ' + dataFirebaseParaDataNormal(dataFirebase)
}

export function somarPedidos(dados: ItemPedido[] | undefined) {
  if (dados != undefined) {
    return dados.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  }
  return 0
}

export function somarVendasDoDia(vendas: HistoricoMesa[] | undefined) {
  if (vendas === undefined) {
    return 0
  }
  let soma = 0
  vendas.map((venda) => {
    soma += somarPedidos(venda.pedidos)
  })
  return soma
}