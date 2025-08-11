export type ItemPedido = {
  id: number
  id_produto?: string
  descricao: string
  quantidade: number
  horario_adicao?: Date
  total?: number,
  preco: number,
  observacao?: string
}