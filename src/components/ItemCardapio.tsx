import { Button, CheckBox, Text, useTheme } from "@ui-kitten/components"
import { StyleSheet, View } from "react-native"
import { Produto } from "../types/produto.type"

export const ItemCardapio: React.FC<Produto> = ({ id_produto, descricao, preco }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme['color-primary-700']}]}>
      <Text style={{ flex: 1, color: 'white' }} category="s1">{descricao}</Text>
      <Text style={{ color: 'white' }} category="s2">R$ {(preco).toFixed(2)}</Text>
      <View style={styles.btnQtdView}>
        <Button size="tiny">-</Button>
        <Text style={{ color: 'white', paddingInline: '2%' }}>1</Text>
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
    justifyContent: 'flex-end'
  }
})