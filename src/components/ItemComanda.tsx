import { CheckBox } from "@ui-kitten/components"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ItemPedido } from "../types/itemPedido.type"
import { useState } from "react"
import { useItensPedido } from "../context/ItensPedidoContext"
import { dataFirebaseParaDataNormal } from "../util/texts.util"

export interface ItemComandaProps {
  indice: number,
  objeto: ItemPedido
}

export const ItemComanda: React.FC<ItemComandaProps> = ({ indice, objeto }) => {
  const [checked, setChecked] = useState(false);

  const { adicionarItemPedido, removerItemPedido, itensPedido } = useItensPedido()

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: (checked) ? '#C5CEE0' : '#E4E9F2' }]}
      onPress={() => {
        let estado = checked
        setChecked(!estado)
        if (!estado) {
          adicionarItemPedido(objeto)
          // console.log('adicionando ', objeto)
        } else {
          removerItemPedido(objeto.id_produto)
          // console.log('removendo  ', objeto)
        }

      }}
    >
      <Text style={{ fontSize: 13 }}>{objeto?.quantidade}x</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{objeto?.descricao}</Text>
        <Text style={{ fontStyle: 'italic', fontSize: 12, display: (objeto?.observacao) ? 'flex' : 'none' }}>Obs: {objeto?.observacao}</Text>
      </View>
      <Text style={{ fontSize: 13 }}>{dataFirebaseParaDataNormal(objeto?.horario_adicao ?? "")}</Text>
      <Text style={{ fontSize: 13, fontWeight: 'bold' }}>R$ {(objeto?.preco * objeto?.quantidade).toFixed(2)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBlock: '7%',
    paddingInline: '3%',
    alignItems: 'center',
    gap: '3%',
  }
})