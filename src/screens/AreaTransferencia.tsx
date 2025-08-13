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
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { authFirebase } from "../auth/auth.firebase";
import { Usuario } from "../types/usuario.type";
import { CardMesaTransferencia } from "../components/CardMesaTransferencia";
import { RootStackParamList } from "../routes/StackRoutes";

type AreaTransferenciaProp = RouteProp<RootStackParamList, "Transferir">;

type Props = {
  route: AreaTransferenciaProp;
};

export const AreaTransferencia: React.FC<Props> = ( { route } ) => {
  const theme = useTheme();

  const id =  route.params.idMesa;

  const [mesas, setMesas] = useState<Mesa[]>([])
  const [qtdMesas, setQtdMesas] = useState<number[]>([])
  const [usuario, setUsuario] = useState<Usuario>()

  async function carregarMesasDeTransferencia() {
    await mesaFirestore.recuperarMesas().then((dados) => {
      if (dados != undefined) {
        setMesas(dados.filter(item => item.id_mesa !== id))
      }
    })

    await mesaFirestore.contarMesas().then((dados) => {
      setQtdMesas(dados ?? [])
    })

    setUsuario(await authFirebase.verificarLogin());
  }


  useFocusEffect(
    useCallback(() => {
      carregarMesasDeTransferencia()
    }, [usuario])
  );


  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        <View style={styles.conteudoUm}>

        </View>

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>

          <Divider />

          {/* <View style={styles.filtragem}>
            <CheckBox status='primary'>Livres</CheckBox>
            <CheckBox status='success'>Ocupadas</CheckBox>
            <CheckBox status='danger'>Aguardando</CheckBox>
          </View> */}

          <FlatList
            data={mesas}
            // keyExtractor={Math.random()}
            renderItem={({ item }) => <CardMesaTransferencia objetoMesa={item} id_mesa_origem={id ?? ""} />}
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
    height: '5%',
    flexDirection: 'row',
    paddingHorizontal: '8%',
    paddingVertical: '10%',
    justifyContent: 'space-between'
  },
  conteudoUmInterno: {
    justifyContent: 'flex-end'
  },
  conteudoDois: {
    height: '90%',
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