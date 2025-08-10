import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CheckBox,
  Divider,
  Input,
  Modal,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ItemCardapio } from "../components/ItemCardapio";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ItemConfirmacao } from "../components/ItemConfirmacao";
import { Produto } from "../types/produto.type";
import { cardapioFirestore } from "../firestore/cardapio.firestore";
import { useItensPedido } from "../context/ItensPedidoContext";

export const Cardapio = () => {
  const theme = useTheme();

  const [value, setValue] = useState<string>('');
  const [produtosCardapio, setProdutosCardapio] = useState<Produto[]>([]);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false)

  const carregarCardapio = async () => {
    await cardapioFirestore.recuperarCardapio().then((dados) => {
      if (dados != undefined) {
        setProdutosCardapio(dados)
      }
    })
  }

  useEffect(() => {
    carregarCardapio()
  }, [])

  return (
    <>

      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        {/* <View style={styles.conteudoUm}>

          </View> */}

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.btnsView}>
            <Input
              placeholder='Pesquisar por produto'
              value={value}
              status="primary"
              appearance="outline"
              accessoryRight={<MaterialIcons name="search" size={24} color="#274BDB" />}
              onChangeText={nextValue => setValue(nextValue)}
            />
          </View>

          <View style={{ height: '70%' }}>
            <FlatList
              data={produtosCardapio}
              renderItem={({ item }) => <ItemCardapio id_produto={item.id_produto} descricao={item.descricao} preco={item.preco} />}
              numColumns={1}
              contentContainerStyle={{
                gap: 5,
              }}
            />
          </View>

          <View style={styles.btnsView}>
            <Button
              appearance="outline"
              accessoryRight={<Ionicons name="receipt" size={20} color="#3366FF" />}
              onPress={() => {
                setMostrarModal(true)
              }}
            >Adicionar ao pedido</Button>
          </View>

        </View>

        <ModalConfirmacao visible={mostrarModal} fechar={() => setMostrarModal(false)} />

      </View>
    </>
  )
}

interface ModalConfirmacaoProps {
  visible: boolean,
  fechar: () => void,
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({ visible, fechar }) => {

  const { itensPedido } = useItensPedido()

  return (
    <View style={styles.containerModal}>

      <Modal
        style={{
          width: '80%',
          height: '60%'
        }}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={fechar}
      >
        <Card style={styles.cardModal} disabled={true}>
          <Text style={{ textAlign: 'center' }} category="label">Revise os itens do pedido</Text>

          <View style={{
            marginBlock: 10,
            height: '70%'
          }}>
            <FlatList
              data={itensPedido}
              renderItem={({ item }) => <ItemConfirmacao descricao={item.descricao} preco={item.preco} />}
              numColumns={1}
              contentContainerStyle={{
                gap: 3,
              }}
            />
          </View>
          <Button onPress={fechar}>
            Confirmar
          </Button>
        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '10%',
    flexDirection: 'column',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'flex-end',
    gap: '5%'
  },
  conteudoDois: {
    height: '100%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    // paddingHorizontal: '8%',
    paddingVertical: '8%',
    gap: '2%'
  },
  btnsView: {
    paddingHorizontal: '8%',
    gap: '6%'
  },
  containerModal: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardModal: {
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'red'
  }
});
