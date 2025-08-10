const icone = require("../public/icone-logo.png");
import {
  Button,
  CheckBox,
  Divider,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Mesa } from "../components/Mesa";
import { QuantidadeInfo } from "../components/QuantidadeInfo";

export default function Inicio() {
  const theme = useTheme();

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
      >

        <View style={styles.conteudoUm}>

          <View style={[styles.conteudoUmInterno]}>
            <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='h5'>
              Bem-vindo ao Up! PDV
            </Text>
            <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='caption'>
              Operador Gerente
            </Text>
          </View>

          <View style={[styles.conteudoUmInterno]}>
            <Button size="medium" style={{ padding: 0, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="settings" size={80} color="white" />
            </Button>
          </View>

        </View>

        {/* renderização das mesas */}
        <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
          <View style={styles.infosMesa}>
            <QuantidadeInfo tema="primary" descricao="livres" quantidade={20} />
            <QuantidadeInfo tema="success" descricao="ocupadas" quantidade={2} />
            <QuantidadeInfo tema="danger" descricao="aguardando" quantidade={3} />
          </View>

          <Divider />

          <View style={styles.filtragem}>
            <CheckBox status='primary'>Livres</CheckBox>
            <CheckBox status='success'>Ocupadas</CheckBox>
            <CheckBox status='danger'>Aguardando</CheckBox>
          </View>

          <FlatList
            data={mesas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Mesa status={item.status as 'ocupada' | 'disponivel' | 'aguardando'} />}
            numColumns={2}
            columnWrapperStyle={{
              gap: 10,
              justifyContent: "flex-start",
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


const mesas = [
  { id: "1", status: "disponivel" },
  { id: "2", status: "ocupada" },
  { id: "3", status: "ocupada" },
  { id: "4", status: "aguardando" },
  { id: "5", status: "disponivel" },
  { id: "6", status: "disponivel" },
  { id: "7", status: "disponivel" },
  { id: "8", status: "aguardando" },
  { id: "9", status: "disponivel" },
  { id: "10", status: "ocupada" },
  { id: "11", status: "ocupada" },
  { id: "12", status: "aguardando" },
  { id: "13", status: "disponivel" },
  { id: "14", status: "disponivel" },
  { id: "15", status: "disponivel" },
  { id: "16", status: "aguardando" },
];