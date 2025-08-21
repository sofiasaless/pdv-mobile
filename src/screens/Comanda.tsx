import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CheckBox,
  Divider,
  useTheme,
} from "@ui-kitten/components";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LabelInfo } from "../components/LabelInfo";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ItemComanda, ItemComandaProps } from "../components/ItemComanda";
import { NavigationProp, RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";
import { Mesa, StatusMesa } from "../types/mesa.type";
import { mesaFirestore } from "../firestore/mesa.firestore";
import { authFirebase } from "../auth/auth.firebase";
import { Usuario } from "../types/usuario.type";
import { useItensPedido } from "../context/ItensPedidoContext";
import { historicoFirestore } from "../firestore/historico.firestore";
import { imprimirPedidosDaMesa } from "../util/printer.util";

type ComandaRouteProp = RouteProp<RootStackParamList, "Comanda">;

type Props = {
  route: ComandaRouteProp;
};

export const Comanda: React.FC<Props> = ({ route }) => {
  const theme = useTheme();

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const id = route.params.idMesa;

  const [mesa, setMesa] = useState<Mesa>()
  const [total, setTotal] = useState<number>(0)

  const [usuario, setUsuario] = useState<Usuario>()

  const { itensPedido, limparItens, isVazio } = useItensPedido()

  const carregarMesa = async () => {
    setUsuario(await authFirebase.verificarLogin());

    if (id != undefined) {
      await mesaFirestore.recuperarMesaPorId(id).then(async (dados) => {
        if (dados != undefined) {
          setMesa(dados)
          setTotal(dados.pedidos.reduce((acc, item) => acc + item.preco * item.quantidade, 0));
        }
      })
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarMesa()
    }, [id, mesa, usuario])
  );

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        <View style={styles.conteudoUm}>

          <View style={[styles.conteudoUmInterno]}>
            <Text style={[styles.text, { color: theme['color-primary-200'], fontSize: 30 }]}>
              MESA {mesa?.numeracao}
            </Text>
            <LabelInfo descricao={mesa?.status as StatusMesa ?? ""} tamanhoLetra="s2" />
          </View>

          <View style={[styles.conteudoInternoDois, { backgroundColor: theme['color-warning-300'] }]}>
            <Text style={{ color: theme['color-warning-900'], fontSize: 18 }} >TOTAL</Text>
            <Text style={{ color: theme['color-warning-900'], fontSize: 18 }} >R$ {total.toFixed(2)}</Text>
          </View>

        </View>

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={[styles.btnsView, { display: (mesa?.status === 'bloqueada') ? 'none' : 'flex' }]}>
            <Button
              disabled={(mesa?.status === 'bloqueada') ? true : false}
              status="warning"
              appearance="outline"
              size="small"
              accessoryRight={<AntDesign name="plus" size={15} color="#DB8B00" />}
              onPress={() => {
                navigator.navigate('Cardapio', {
                  idMesa: id
                })
              }}
            >Selecionar produto do cardápio</Button>
          </View>

          <View style={{ height: '60%' }}>
            <FlatList
              data={mesa?.pedidos}
              renderItem={({ item, index }) => (
                <ItemComanda
                  indice={index}
                  objeto={item}
                />
              )}
              numColumns={1}
            />
          </View>

          <View style={[styles.btnsView, { display: (mesa?.status === 'bloqueada') ? 'none' : 'flex' }]}>
            <Button
              disabled={(mesa?.pedidos.length === 0)}
              accessoryRight={<Ionicons name="receipt" size={20} color="white" />}
              onPress={async () => {
                let mesaObj = mesa as Mesa
                await mesaFirestore.atualizarMesa('bloqueada', id ?? '')

                await imprimirPedidosDaMesa(mesaObj)
              }}
            >Encerrar conta</Button>

            <View
              style={[
                styles.btnsOtherView,
                {
                  display: (usuario?.role.includes('GERENTE') ? 'flex' : 'none')
                }
              ]}
            >
              <Button status="success" style={{ flex: 1 }}
                accessoryRight={<MaterialCommunityIcons name="transfer" size={20} color="white" />}
                disabled={isVazio()}
                onPress={() => {
                  navigator.navigate('Transferir', {
                    idMesa: id,
                    disponibilizarMesa: (itensPedido.length === mesa?.pedidos.length)
                  })
                  // console.log(itensPedido)
                }}
              >Transferir itens</Button>
              <Button status="danger" style={{ flex: 1 }}
                accessoryRight={<MaterialCommunityIcons name="trash-can" size={20} color="white" />}
                disabled={isVazio()}
                onPress={() => {
                  Alert.alert('Excluir itens', 'Tem certeza que deseja excluir os itens selecionados?', [
                    {
                      text: 'Excluir',
                      onPress: async () => {
                        await mesaFirestore.removerPedidos(itensPedido, id ?? "")
                        limparItens()
                        if (mesa?.pedidos.length === itensPedido.length) {
                          console.log('mesa ta disponivel')
                          await mesaFirestore.atualizarMesa('disponivel', id ?? "")
                        }
                      }
                    }
                  ])
                }}
              >Excluir itens</Button>
            </View>
          </View>

          <View
            style={[
              styles.btnsView,
              {
                display: (mesa?.status === 'bloqueada') ?
                  (usuario?.role.includes('GERENTE')) ? 'flex' : 'none'
                  :
                  'none'
              }
            ]}
          >
            <Button status="success"
              accessoryRight={<MaterialIcons name="payments" size={20} color="white" />}
              onPress={async () => {
                try {
                  Alert.alert('Confirmar', 'Tem certeza que deseja confirmar o pagamento?', [
                    {
                      text: 'Confirmar',
                      onPress: async () => {
                        await historicoFirestore.registrarHistorico({
                          encerradoEm: new Date(),
                          idMesa: id ?? "",
                          numeracao: mesa?.numeracao ?? 0,
                          pedidos: mesa?.pedidos ?? [],
                        })
                        await mesaFirestore.confirmarPagamento('disponivel', id ?? "")
                      }
                    }
                  ])
                } catch (error) {
                  console.log('erro ao confirmar pagamento ', error)
                }

              }}
            >Confirmar pagamento</Button>

            <View style={styles.btnsOtherView}>
              <Button status="warning" style={{ flex: 1 }}
                accessoryRight={<MaterialIcons name="menu-open" size={20} color="white" />}
                onPress={async () => {
                  await mesaFirestore.atualizarMesa('ocupada', id ?? "");
                }}
              >Reabir mesa</Button>
              <Button status="info" style={{ flex: 1 }}
                accessoryRight={<MaterialIcons name="print" size={20} color="white" />}
                onPress={async () => {
                  let mesaObj = mesa as Mesa
                  await imprimirPedidosDaMesa(mesaObj)
                }}
              >Imprimir</Button>
            </View>
          </View>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '15%',
    flexDirection: 'column',
    paddingHorizontal: '8%',
    // paddingVertical: '10%',
    justifyContent: 'center',
    gap: '5%'
  },
  conteudoUmInterno: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'grey',
    width: '100%'
  },
  conteudoInternoDois: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingInline: '2%',
    paddingBlock: '1%',
    borderRadius: 3
  },
  conteudoDois: {
    height: '85%',
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
  btnsOtherView: {
    flexDirection: 'row',
    gap: '5%',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    textAlign: 'left'
  },
  filtragem: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  infosMesa: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10
  },
  mesaContainer: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});