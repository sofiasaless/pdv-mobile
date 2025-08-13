import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CheckBox,
  Divider,
  useTheme,
} from "@ui-kitten/components";
import {
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

  const carregarMesa = async () => {
    setUsuario(await authFirebase.verificarLogin());

    if (id != undefined) {
      await mesaFirestore.recuperarMesaPorId(id).then((dados) => {
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
              accessoryRight={<Ionicons name="receipt" size={20} color="white" />}
              onPress={async () => {
                await mesaFirestore.atualizarMesa('bloqueada', id ?? '')
                // navigator.goBack();

                // await authFirebase.logoutUsuario()
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
              >Transferir itens</Button>
              <Button status="danger" style={{ flex: 1 }}
                accessoryRight={<MaterialCommunityIcons name="trash-can" size={20} color="white" />}
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
                await mesaFirestore.confirmarPagamento('disponivel', id ?? "")
              }}
            >Confirmar pagamento</Button>

            <View style={styles.btnsOtherView}>
              <Button status="warning" style={{ flex: 1 }}
                accessoryRight={<MaterialIcons name="menu-open" size={20} color="white" />}
                onPress={async () => {
                  await mesaFirestore.atualizarMesa('ocupada', id ?? "");
                  navigator.goBack();
                }}
              >Reabir mesa</Button>
              <Button status="info" style={{ flex: 1 }}
                accessoryRight={<MaterialIcons name="print" size={20} color="white" />}
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
    height: '20%',
    flexDirection: 'column',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'flex-end',
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
    height: '80%',
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