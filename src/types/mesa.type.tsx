import { ItemPedido } from "./itemPedido.type"

export type Mesa = {
  id_mesa?: string
  numeracao: number
  pedidos: ItemPedido[]
  status: StatusMesa
}

export type StatusMesa = 'disponivel' | 'bloqueada' | 'ocupada'