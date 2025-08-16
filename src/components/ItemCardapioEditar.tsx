import { Button, useTheme } from "@ui-kitten/components"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { Produto } from "../types/produto.type"
import { useItensPedido } from "../context/ItensPedidoContext";
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ItemCardapioProps {
  objeto: Produto,
}

export const ItemCardapioEditar: React.FC<ItemCardapioProps> = ({ objeto }) => {
  const theme = useTheme();

  const [selecionado, setSelecionado] = useState<boolean>(false)

  const { adicionarItemPedido, removerItemPedido } = useItensPedido()

  const selecionarItem = (acao: boolean) => {
    if (acao) {
      adicionarItemPedido({
        id: Math.random(),
        descricao: objeto.descricao,
        preco: objeto.preco,
        quantidade: 1,
        total: 0,
        horario_adicao: new Date,
        id_produto: objeto.id_produto,
        observacao: ''
      })
    } else {
      removerItemPedido(objeto.id_produto ?? "")
    }
  }

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: theme[(selecionado) ? 'color-primary-900' : 'color-primary-700'] }]}
      onPress={() => {
        setSelecionado(!selecionado)
        selecionarItem(!selecionado)
      }}
    >
      <Text style={{ flex: 1, color: 'white', fontSize: 15 }}>{objeto.descricao}</Text>
      <Text style={{ color: 'white', fontSize: 15 }}>R$ {(objeto.preco).toFixed(2)}</Text>
      {/* botao para  adicionar observacao ao item do pedido*/}
      {/* <Button
        size="tiny"
        style={{
          display: (selecionado) ? 'flex' : 'none'
        }}
        onPress={() => abrirModalObs?.(objeto)}
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