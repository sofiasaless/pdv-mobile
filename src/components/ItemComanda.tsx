import { CheckBox, Text } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"

export interface ItemComandaProps {
  id: number,
  quantidade: number,
  descricao: string,
  horario: string,
  preco: number
}

export const ItemComanda: React.FC<ItemComandaProps> = ( { id, quantidade, descricao, horario, preco } ) => {
  return (
    <View style={[styles.container, { backgroundColor: (id % 2 === 0)? '#E4E9F2':'#C5CEE0'}]}>
      <CheckBox status='primary' />
      <Text category="s2">{quantidade}</Text>
      <Text style={{flex: 1}} category="s2">{descricao}</Text>
      <Text category="s2">{horario}</Text>
      <Text category="label">R$ {(preco).toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBlock: '3%',
    paddingInline: '3%',
    alignItems: 'center',
    gap: '3%',
  }
})