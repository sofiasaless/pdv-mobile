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
import { useState } from "react";
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
import { authFirebase } from "../auth/auth.firebase";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/StackRoutes";

export default function Login() {
  const theme = useTheme();

  const operadores = ['Garçom', 'Gerente'];
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
  const [senha, setSenha] = useState('');

  const [acaoModal, setAcaoModal] = useState<'ERRO' | 'SUCESSO'>('ERRO')

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
            value={senha}
            onChangeText={setSenha}
          />

          <Button status="primary" size="medium"
            onPress={async () => {
              if (selectedIndex.row === 1) {
                if (await authFirebase.loginUsuario({ tipo: 'GERENTE', senha: senha })) {
                  setAcaoModal('SUCESSO')
                }
              } else {
                if (await authFirebase.loginUsuario({ tipo: 'GARCOM', senha: senha })) {
                  setAcaoModal('SUCESSO')
                }
              }
              setVisibleModal(true)
            }}
          >Entrar</Button>
          {/* <Button
            size="tiny"
            onPress={async () => {
              await authFirebase.logoutUsuario()
            }}
          >logout</Button> */}
        </View>
      </KeyboardAvoidingView>

      <ModalAlerta
        visivel={visibleModal}
        fechar={() => setVisibleModal(false)}
        acao={acaoModal}
      />
    </>
  );
}

interface ModalAlertaProps {
  visivel: boolean;
  fechar: () => void;
  acao: 'ERRO' | 'SUCESSO'
}

export const ModalAlerta: React.FC<ModalAlertaProps> = ({ visivel, fechar, acao }) => {

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Modal
      visible={visivel}
      backdropStyle={styles.backdrop}
      onBackdropPress={fechar}
    >
      <Card disabled={true}>
        <Text>
          {
            (acao === 'SUCESSO') ?
              'Login efetuado com sucesso!'
              :
              'Ocorreu um erro, por favor tente novamente!'
          }
        </Text>
        <Button status={(acao === 'SUCESSO') ? 'success' : 'danger'} appearance="outline"
          onPress={() => {
            if (acao === 'SUCESSO') {
              navigator.navigate('Inicio')
            } else {
              fechar();
            }
          }}
        >
          {
            (acao === 'SUCESSO') ?
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