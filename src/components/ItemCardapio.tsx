import { Text, useTheme } from "@ui-kitten/components"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Produto } from "../types/produto.type"
import { useItensPedido } from "../context/ItensPedidoContext";
import { useState } from "react";

export const ItemCardapio: React.FC<Produto> = ({ id_produto, descricao, preco }) => {
  const theme = useTheme();

  const [selecionado, setSelecionado] = useState<boolean>(false)

  const { adicionarItemPedido, removerItemPedido } = useItensPedido()

  const selecionarItem = (acao: boolean) => {
    if (acao) {
      adicionarItemPedido({
        id: Math.random(),
        descricao: descricao,
        preco: preco,
        quantidade: 1,
        total: 1,
        horario_adicao: new Date,
        id_produto: id_produto
      })
    } else {
      removerItemPedido(id_produto ?? "")
    }
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: theme[(selecionado) ? 'color-primary-900' : 'color-primary-700'] }]}
      onPress={() => {
        setSelecionado(!selecionado)
        selecionarItem(!selecionado)
      }}
    >
      <Text style={{ flex: 1, color: 'white' }} category="s1">{descricao}</Text>
      <Text style={{ color: 'white' }} category="s2">R$ {(preco).toFixed(2)}</Text>
      {/* <Button
        size="tiny"
        style={{
          display: (selecionado) ? 'flex' : 'none'
        }}
        accessoryLeft={<MaterialCommunityIcons name="note-edit-outline" size={13} color="white" />}
      >
      </Button> */}
    </TouchableOpacity>
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