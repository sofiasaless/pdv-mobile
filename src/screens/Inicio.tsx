const icone = require("../public/icone-logo.png");
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CardMesa } from "../components/CardMesa";
import { QuantidadeInfo } from "../components/QuantidadeInfo";
import { useCallback, useEffect, useState } from "react";
import { Mesa, StatusMesa } from "../types/mesa.type";
import { mesaFirestore } from "../firestore/mesa.firestore";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { authFirebase } from "../auth/auth.firebase";
import { Usuario } from "../types/usuario.type";
import { RootStackParamList } from "../routes/StackRoutes";
import { useItensPedido } from "../context/ItensPedidoContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Inicio() {
  const theme = useTheme();

  const [mesas, setMesas] = useState<Mesa[]>([])
  const [qtdMesas, setQtdMesas] = useState<number[]>([])
  const [usuario, setUsuario] = useState<Usuario>()

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  const { limparItens } = useItensPedido()

  async function carregarMesas() {
    await mesaFirestore.recuperarMesas().then((dados) => {
      if (dados != undefined) {
        setMesas(dados)
      }
    })

    await mesaFirestore.contarMesas().then((dados) => {
      setQtdMesas(dados ?? [])
    })

    setUsuario(await authFirebase.verificarLogin());
  }

  const verificarEstadoUsuario = async () => {
    if (await AsyncStorage.getItem('usuario') === null) {
      navigator.navigate('Login')
    }
  }


  useFocusEffect(
    useCallback(() => {
      verificarEstadoUsuario();
      carregarMesas()
      limparItens()
    }, [usuario])
  );


  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        <View style={styles.conteudoUm}>

          <View style={[styles.conteudoUmInterno]}>
            <Text style={[styles.text, { color: theme['color-primary-200'], fontSize: 20, fontWeight: 'bold' }]}>
              Bem-vindo ao Up! PDV
            </Text>
            <Text style={[styles.text, { color: theme['color-primary-200'], fontSize: 15 }]}>
              Operador {usuario?.tipo}
            </Text>
          </View>

          <View style={[styles.conteudoUmInterno]}>
            <Button size="medium"
              style={{
                padding: 0, justifyContent: 'center', alignItems: 'center',
                display: (usuario?.role.includes('GERENTE')) ? 'flex' : 'none'
              }}
              onPress={async () => {
                navigator.navigate('Configuracoes')
              }}
            >
              <MaterialIcons name="settings" size={80} color="white" />
            </Button>
          </View>

        </View>

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.infosMesa}>
            <QuantidadeInfo tema="primary" descricao={`livres`} quantidade={qtdMesas[0]} />
            <QuantidadeInfo tema="success" descricao="ocupadas" quantidade={qtdMesas[1]} />
            <QuantidadeInfo tema="danger" descricao="aguardando" quantidade={qtdMesas[2]} />
          </View>

          <Divider />

          {/* <View style={styles.filtragem}>
            <CheckBox status='primary'>Livres</CheckBox>
            <CheckBox status='success'>Ocupadas</CheckBox>
            <CheckBox status='danger'>Aguardando</CheckBox>
          </View> */}

          <FlatList
            data={mesas}
            // keyExtractor={Math.random()}
            renderItem={({ item }) => <CardMesa numeracao={item.numeracao} pedidos={[]} id_mesa={item.id_mesa} status={item.status as StatusMesa} />}
            numColumns={2}
            columnWrapperStyle={{
              gap: 10,
              justifyContent: "center",
            }}
            contentContainerStyle={{
              gap: 10,
              paddingBottom: 20
            }}
            showsVerticalScrollIndicator={false}
          />

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '20%',
    flexDirection: 'row',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'space-between'
  },
  conteudoUmInterno: {
    justifyContent: 'flex-end'
  },
  conteudoDois: {
    height: '80%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    paddingHorizontal: '8%',
    paddingVertical: '8%',
    gap: '2%'
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