import { Button, CheckBox, Text, useTheme } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { ItemPedido } from "../types/itemPedido.type";

interface ItemConfirmacaoProps {
  objeto: ItemPedido
}

export const ItemConfirmacao: React.FC<ItemConfirmacaoProps> = ({ objeto }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme['color-basic-400']}]}>
      <View style={{flex: 1}}>
        <Text category="s2">{objeto.descricao}</Text>
        <Text category="s2">R$ {(objeto.preco).toFixed(2)}</Text>
        <Text category="c1">{objeto.observacao}</Text>
      </View>
      <View style={styles.btnQtdView}>
        <Button size="tiny">–</Button>
        <Text>{objeto.quantidade}</Text>
        <Button size="tiny">+</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBlock: '5%',
    paddingInline: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3%',
  },
  btnQtdView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    gap: 5
  }
})