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
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";
import { mesaFirestore } from "../firestore/mesa.firestore";

type CardapioRouteProp = RouteProp<RootStackParamList, "Cardapio">;

type Props = {
  route: CardapioRouteProp;
};

export const Cardapio: React.FC<Props> = ({ route }) => {
  const theme = useTheme();

  const idMesa = route.params.idMesa;


  const [produtosCardapio, setProdutosCardapio] = useState<Produto[]>([]);

  const [mostrarModal, setMostrarModal] = useState<boolean>(false)
  const [mostrarModalObs, setMostrarModalObs] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<Produto | null>(null);

  // pesquisa por produtos
  const [pesquisa, setPesquisa] = useState<string>('')
  const produtosFiltrados = produtosCardapio.filter((item) =>
    item.descricao.toLowerCase().includes(pesquisa.toLowerCase().trim())
  );


  const carregarCardapio = async () => {
    console.log('renderizando cardapio ')
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
              value={pesquisa}
              status="primary"
              appearance="outline"
              accessoryRight={<MaterialIcons name="search" size={24} color="#274BDB" />}
              onChangeText={nextValue => setPesquisa(nextValue)}
            />
          </View>

          <View style={{ height: '70%' }}>
            <FlatList
              keyExtractor={(item) => item.id_produto ?? item.descricao}
              data={produtosFiltrados}
              renderItem={({ item }) => (
                <ItemCardapio
                  objeto={item}
                  abrirModalObs={(produto) => {
                    setItemSelecionado(produto);
                    setMostrarModalObs(true);
                  }}
                />
              )}
              numColumns={1}
              contentContainerStyle={{ gap: 5 }}
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

        <ModalConfirmacao visible={mostrarModal} fechar={() => setMostrarModal(false)} idMesa={idMesa ?? ""} />
        <ModalObservacao
          visible={mostrarModalObs}
          fechar={() => setMostrarModalObs(false)}
          produto={itemSelecionado}
        />
      </View>
    </>
  )
}

interface ModalConfirmacaoProps {
  visible: boolean,
  fechar: () => void,
  idMesa: string
}

const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({ visible, fechar, idMesa }) => {

  const { itensPedido, limparItens } = useItensPedido()
  const navigator = useNavigation();

  return (
    <View style={styles.containerModal}>

      <Modal
        style={{ minWidth: 330, maxHeight: 500 }} // usar tamanho fixo ou maxWidth
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={fechar}
      >
        <Card disabled>
          <Text style={{ textAlign: 'center' }} category="label">
            Revise os itens do pedido
          </Text>

          <View style={{ marginVertical: 10, maxHeight: 300 }}>
            <FlatList
              data={itensPedido}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <ItemConfirmacao objeto={item} />
              )}
              contentContainerStyle={{ gap: 3 }}
            />
          </View>

          <Button onPress={async () => {
            // console.log(itensPedido)
            // console.log(idMesa)
            await mesaFirestore.adicionarPedidos(itensPedido, idMesa)

            limparItens()
            fechar()
            navigator.goBack()
          }}

          >Confirmar</Button>
        </Card>
      </Modal>

    </View>
  );
};

interface ModalObservacaoProps {
  visible: boolean;
  fechar: () => void;
  produto: Produto | null;
}

const ModalObservacao: React.FC<ModalObservacaoProps> = ({ visible, fechar, produto }) => {
  const [observacao, setObservacao] = useState('');

  const { atualizarObservacao } = useItensPedido();

  if (!produto) return null; // evita render sem item

  return (
    <View style={styles.containerModal}>
      <Modal
        style={{ minWidth: 330, maxHeight: 300 }}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={fechar}
      >
        <Card disabled>
          <Text style={{ textAlign: 'center' }} category="label">
            Observação para {produto.descricao}
          </Text>

          <Input
            label="Observações"
            placeholder="Digite aqui..."
            value={observacao}
            onChangeText={setObservacao}
            multiline
          />

          <Button
            status="warning"
            appearance="outline"
            onPress={() => {
              atualizarObservacao(produto.id_produto!, observacao);
              fechar();
              setObservacao('');
            }}
          >
            Adicionar
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
