const icone = require("../public/icone-logo.png");
import {
  IndexPath,
  Select,
  SelectItem,
  Text,
  useTheme,
  Input,
  Button,
  Card,
  Modal
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from "react-native";

export default function Login() {
  const theme = useTheme();

  const operadores = ['Garçom', 'Gerente'];
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
  const [value, setValue] = useState('');

  // para o modal
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <View style={styles.conteudoUm}>
          <Image
            style={{ width: 150, height: 150 }}
            source={icone}
          />

          <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='h2'>
            Bem-vindo ao Up! PDV
          </Text>
          <Text style={[styles.text, { color: theme['color-primary-200'] }]} category='caption'>
            Insira suas credenciais para prosseguir.
          </Text>
        </View>

        <View style={[styles.conteudoDois, { backgroundColor: 'white' }]}>
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

          <Button status="primary" size="medium" onPress={() => setVisibleModal(true)}>
            Entrar
          </Button>
        </View>
      </KeyboardAvoidingView>

      <ModalAlerta 
        visivel={visibleModal} 
        fechar={() => setVisibleModal(false)} 
        acao="ERRO"
      />
    </>
  );
}

interface ModalAlertaProps {
  visivel: boolean;
  fechar: () => void;
  acao: 'SUCEDIDO' | 'ERRO'
}

export const ModalAlerta: React.FC<ModalAlertaProps> = ({ visivel, fechar, acao }) => {

  return (
    <Modal
      visible={visivel}
      backdropStyle={styles.backdrop}
      onBackdropPress={fechar}
    >
      <Card disabled={true}>
        <Text>
          {
            (acao === 'SUCEDIDO')?
            'Login efetuado com sucesso!'
            :
            'Ocorreu um erro, por favor tente novamente!'
          }
        </Text>
        <Button status={(acao === 'SUCEDIDO')?'success':'danger'} appearance="outline" onPress={fechar}>
          {
            (acao === 'SUCEDIDO')?
            'Prosseguir'
            :
            'Tentar novamente'
          }
        </Button>
      </Card>
    </Modal>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  conteudoUm: {
    height: '60%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%'
  },
  conteudoDois: {
    height: '40%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    paddingHorizontal: '8%',
    // paddingVertical: '8%',
    gap: 20,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  },
  containerModal: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});