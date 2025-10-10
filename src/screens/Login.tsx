const icone = require("../public/logo.png");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Button,
  Card,
  IndexPath,
  Input,
  Modal,
  Select,
  SelectItem,
  useTheme
} from "@ui-kitten/components";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { authFirebase } from "../auth/auth.firebase";
import { RootStackParamList } from "../routes/StackRoutes";

import * as SplashScreen from 'expo-splash-screen';
import { colors, fonts } from "../theme/colors.theme";
import { Botao } from "../components/Botao";
SplashScreen.preventAutoHideAsync();

export default function Login() {
  const theme = useTheme();

  const operadores = ['Garçom', 'Gerente'];
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
  const [senha, setSenha] = useState('');

  const [acaoModal, setAcaoModal] = useState<'ERRO' | 'SUCESSO'>('ERRO')

  // para o modal
  const [visibleModal, setVisibleModal] = useState(false);

  const navigator = useNavigation<NavigationProp<RootStackParamList>>();

  // const verificarEstadoUsuario = async () => {
  //   if (await authFirebase.verificarLogin() != undefined) {
  //     if (navigator.canGoBack()) {
  //       navigator.goBack();
  //     } else {
  //       navigator.navigate('Inicio')
  //     }

  //   }
  // }

  const [loaded, error] = useFonts({
    'Barlow-Bold': require('../../assets/fonts/Barlow-Bold.ttf'),
    'Barlow-Regular': require('../../assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Medium': require('../../assets/fonts/Barlow-Medium.ttf'),
  });

  const controleDeDadosPreSalvos = async () => {
    if (await AsyncStorage.getItem('usuario') != null) {
      // console.log('removendo usuario pre-salvo...')
      await AsyncStorage.removeItem('usuario')
      // console.log(await AsyncStorage.getItem('usuario'))
    }
  }

  const [isCarregando, setIsCarregando] = useState<boolean>(false)

  useFocusEffect(
    useCallback(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
      controleDeDadosPreSalvos()
    }, [loaded, error])
  );

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        // style={[styles.container, { backgroundColor: theme['color-primary-800'] }]}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <View style={styles.conteudoUm}>
          <Image
            style={{ width: 150, height: 150, borderRadius: 100 }}
            source={icone}
          />

          <Text style={[styles.text, { color: theme['color-primary-200'], fontSize: 30 }]} >
            Bem-vindo ao Up! PDV
          </Text>
          <Text style={[styles.text, { color: theme['color-primary-200'], fontSize: 15 }]} >
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

          {/* <Button status="primary" size="medium"
            onPress={async () => {
              // console.log(selectedIndex.row)
              // console.log(senha)
              if (selectedIndex.row === 1) {
                if (await authFirebase.loginUsuario({ tipo: 'GERENTE', senha: senha })) {
                  setAcaoModal('SUCESSO')
                } else {
                  setAcaoModal('ERRO')
                }
              } else {
                if (await authFirebase.loginUsuario({ tipo: 'GARCOM', senha: senha })) {
                  setAcaoModal('SUCESSO')
                } else {
                  setAcaoModal('ERRO')
                }
              }
              setVisibleModal(true)
            }}
          >Entrar</Button> */}

          <Botao
            cor={colors.azul_principal}
            titulo="Entrar"
            disabled={isCarregando}
            onPress={async () => {
              setIsCarregando(true)
              if (selectedIndex.row === 1) {
                if (await authFirebase.loginUsuario({ tipo: 'GERENTE', senha: senha })) {
                  setAcaoModal('SUCESSO')
                  setSenha('')
                } else {
                  setAcaoModal('ERRO')
                }
              } else {
                if (await authFirebase.loginUsuario({ tipo: 'GARCOM', senha: senha })) {
                  setAcaoModal('SUCESSO')
                  setSenha('')
                } else {
                  setAcaoModal('ERRO')
                }
              }
              setVisibleModal(true)
              setIsCarregando(false)
            }}
          />

          {/* <Button
            size="tiny"
            onPress={async () => {
              console.log(await AsyncStorage.getItem('usuario'))
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
        <Button 
          style={{marginTop: 10}}
          status={(acao === 'SUCESSO') ? 'success' : 'danger'} appearance="outline"
          onPress={() => {
            if (acao === 'SUCESSO') {
              fechar();
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
    justifyContent: 'space-between',
    backgroundColor: colors.azul_principal
  },
  conteudoUm: {
    height: '60%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
    backgroundColor: colors.azul_principal
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
    textAlign: 'center',
    fontFamily: fonts.font_family_medio
  },
  containerModal: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});