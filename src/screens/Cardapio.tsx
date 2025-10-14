import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  Button,
  Card,
  Input,
  Modal,
  useTheme
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ItemCardapio } from "../components/ItemCardapio";
import { ItemConfirmacao } from "../components/ItemConfirmacao";
import { useItensPedido } from "../context/ItensPedidoContext";
import { cardapioFirestore } from "../firestore/cardapio.firestore";
import { mesaFirestore } from "../firestore/mesa.firestore";
import { RootStackParamList } from "../routes/StackRoutes";
import { Produto } from "../types/produto.type";
import * as Network from "expo-network";
import { colors } from '../theme/colors.theme';
import { Botao } from '../components/Botao';
import { BotaoBadge } from '../components/BotaoBadge';
import { Carregando } from '../components/Carregando';

type CardapioRouteProp = RouteProp<RootStackParamList, "Cardapio">;

type Props = {
  route?: CardapioRouteProp;
};

export const Cardapio: React.FC<Props> = ({ route }) => {
  const theme = useTheme();

  const idMesa = route?.params.idMesa;

  const { limparItens, itensPedido } = useItensPedido()

  const [carregando, setCarregando] = useState<boolean>(true)

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
    try {
      console.log('renderizando cardapio ')
      setCarregando(true)
      limparItens()
      await cardapioFirestore.recuperarCardapio().then((dados) => {
        if (dados != undefined) {
          setProdutosCardapio(dados)
        }
      })
      setCarregando(false)
    } catch (error) {
      setCarregando(false)
      Alert.alert('Erro ao carregar o cardápio', `${error}`)
    }
  }

  useEffect(() => {
    console.log('entrando no useEffec')
    carregarCardapio()
  }, [])

  return (
    <>

      <View
        style={[styles.container, { backgroundColor: colors.azul_principal }]}
      >

        {/* <View style={styles.conteudoUm}>

          </View> */}

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.btnsView}>
            <Input
              placeholder='Pesquisar por produto'
              value={pesquisa}
              // appearance="outline"
              // size="medium"
              accessoryRight={<MaterialIcons name="search" size={24} color="#274BDB" />}
              onChangeText={nextValue => setPesquisa(nextValue)}
            />
          </View>

          <View style={{ height: '70%' }}>
            {(carregando) ?
              <Carregando />
              :
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
                contentContainerStyle={{ gap: 8 }}
              />
            }
          </View>

          <View style={styles.btnsView}>
            {/* <Button
              appearance="outline"
              accessoryRight={<Ionicons name="receipt" size={20} color="#3366FF" />}
              onPress={() => {
                setMostrarModal(true)
              }}
            >Adicionar ao pedido</Button> */}

            <BotaoBadge
              cor={colors.azul_principal}
              titulo={"Ver produtos"}
              disabled={false}
              onPress={() => {
                setMostrarModal(true)
              }}
              badgeNumber={itensPedido.length}
              badgeText={(itensPedido.length > 1) ? 'adicionados' : 'adicionado'}
              icone={<Ionicons name="cart-sharp" size={22} color="white" />}
              flex
            />
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

  const [isCarregando, setIsCarregando] = useState<boolean>(false)

  const adicionarAoPedido = async () => {
    try {
      setIsCarregando(true)
      const state = await Network.getNetworkStateAsync();

      if (!state.isInternetReachable) {
        Alert.alert("Verificando conexão com a internet...", "Tente novamente em alguns instantes.");
        setIsCarregando(false)
        return;
      }

      if (!state.isConnected) {
        Alert.alert(
          "Sem conexão",
          "Você não está conectado à internet. Por favor, verifique sua conexão antes de continuar."
        );
        setIsCarregando(false)
        return;
      }

      await mesaFirestore.adicionarPedidos(itensPedido, idMesa)

      limparItens()
      fechar()
      navigator.goBack()
    } catch (error) {
      Alert.alert(`Ocorreu um erro ao tentar confirmar o pedido, tente novamente em alguns instantes: ${error}`)
    }

  }

  return (
    <View style={styles.containerModal}>

      <Modal
        style={{ minWidth: 330, maxHeight: 500 }} // usar tamanho fixo ou maxWidth
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={fechar}
      >
        <Card disabled>
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
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

          {/* <Button
            disabled={isCarregando}
            onPress={adicionarAoPedido}
          >Confirmar</Button> */}

          <Botao
            titulo="Enviar pedido"
            disabled={isCarregando}
            cor={colors.azul_principal}
            onPress={adicionarAoPedido}
            icone={<FontAwesome name="send" size={20} color="white" />}
          />
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
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
            Observação para {produto.descricao}
          </Text>

          <Input
            style={{ marginBottom: 15 }}
            label="Observações"
            placeholder="Digite aqui..."
            value={observacao}
            onChangeText={setObservacao}
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
    height: '7%',
    paddingHorizontal: '8%',
    // gap: '6%'
  },
  containerModal: {
    minHeight: 192
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
