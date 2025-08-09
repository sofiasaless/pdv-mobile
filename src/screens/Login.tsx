import {
  IndexPath,
  Select,
  SelectItem,
  Text,
  useTheme,
  Input,
  Button
} from "@ui-kitten/components";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

export default function Login() {
  const theme = useTheme();

  const operadores = ['Garçom', 'Gerente'];
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
  const [value, setValue] = useState('');

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme['color-primary-900'] }]}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
    >
      {/* <View style={[styles.container, { backgroundColor: theme['color-primary-900'] }]}> */}

      <View style={styles.conteudoUm}>
        <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='h2'>
          Bem-vindo ao Up! PDV
        </Text>
        <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='caption'>
          Insira suas credenciais para prosseguir.
        </Text>
      </View>

      <View style={[styles.conteudoDois, { backgroundColor: theme['color-primary-100'] }]}>
        <Select
          status="primary"
          label='Operador'
          selectedIndex={selectedIndex}
          value={operadores[selectedIndex.row]}
          onSelect={(index: IndexPath | IndexPath[]) => {
            if (Array.isArray(index)) {
              setSelectedIndex(index[0]);
            } else {
              setSelectedIndex(index);
            }
          }}
        >
          {operadores.map((op, i) => (
            <SelectItem key={i} title={op} />
          ))}
        </Select>

        <Input
          label='Senha'
          placeholder='Insira a senha do operador'
          status="primary"
          value={value}
          onChangeText={setValue}
        />

        <Button status="primary" size="medium">
          Entrar
        </Button>
      </View>

      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '60%',
    justifyContent: 'center',
    paddingHorizontal: '8%'
  },
  conteudoDois: {
    height: '40%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    paddingHorizontal: '8%',
    paddingVertical: '8%',
    gap: 20,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  }
});