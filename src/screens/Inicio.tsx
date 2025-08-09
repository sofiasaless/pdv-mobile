const icone = require("../public/icone-logo.png");
import {
  Button,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  StyleSheet,
  View,
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Mesa } from "../components/Mesa";

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
          <View style={styles.mesaContainer}>
            <Mesa status="disponivel"/>
            <Mesa status="ocupada"/>
            <Mesa status="ocupada"/>
            <Mesa status="aguardando"/>
            <Mesa status="disponivel"/>
            <Mesa status="disponivel"/>
            <Mesa status="disponivel"/>
            <Mesa status="aguardando"/>
          </View>
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
  },
  text: {
    textAlign: 'left'
  },
  mesaContainer: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});