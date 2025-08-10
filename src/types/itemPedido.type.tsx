export type ItemPedido = {
  id: number
  descricao: string
  quantidade: number
  horario_adicao?: Date
  total?: number,
  preco: number
}