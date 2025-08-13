import { CheckBox } from "@ui-kitten/components"
import { StyleSheet, Text, View } from "react-native"
import { ItemPedido } from "../types/itemPedido.type"
import dataFirebaseParaDataNormal from "../util/texts.util"

export interface ItemComandaProps {
  indice: number,
  objeto: ItemPedido
}

export const ItemComanda: React.FC<ItemComandaProps> = ( { indice, objeto } ) => {
  return (
    <View style={[styles.container, { backgroundColor: (indice % 2 === 0)? '#E4E9F2':'#C5CEE0'}]}>
      <CheckBox status='primary' />
      <Text style={{fontSize: 13}}>{objeto?.quantidade} uni.</Text>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 13}}>{objeto?.descricao}</Text>
        <Text style={{ fontStyle: 'italic', fontSize: 12 }}>Obs: {objeto?.observacao}</Text>
      </View>
      <Text style={{fontSize: 13}}>{dataFirebaseParaDataNormal(objeto?.horario_adicao ?? "")}</Text>
      <Text style={{fontSize: 13, fontWeight: 'bold'}}>R$ {(objeto?.preco * objeto?.quantidade).toFixed(2)}</Text>
    </View>
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