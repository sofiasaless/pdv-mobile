import { DocumentReference } from "firebase/firestore"
import { ItemPedido } from "./itemPedido.type"

export type HistoricoMesa = {
  numeracao: number,
  encerradoEm: Date,
  idMesa: string,
  pedidos: ItemPedido[] | undefined,
  id_historico?: string,
  mesa_reference?: DocumentReference
}