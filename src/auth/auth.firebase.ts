import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { TipoUsuario, Usuario, UsuarioLogin } from "../types/usuario.type";
import { EMAIL_GERENTE, EMAIL_GARCOM } from "@env"
import AsyncStorage from "@react-native-async-storage/async-storage";

const colecaoAuth = 'usuarios'

export const authFirebase = {
  loginUsuario: async (usuarioLogin: UsuarioLogin) => {
    try {
      let credenciais
      let usuario: Usuario
      if (usuarioLogin.tipo === 'GARCOM') {
        credenciais = await signInWithEmailAndPassword(auth, EMAIL_GARCOM, usuarioLogin.senha);
        usuario = {
          email: credenciais.user.email ?? "",
          role: ['GARCOM'] as TipoUsuario[],
          tipo: 'GARCOM',
          id_usuario: credenciais.user.uid
        }
      } else {
        credenciais = await signInWithEmailAndPassword(auth, EMAIL_GERENTE, usuarioLogin.senha);
        usuario = {
          email: credenciais.user.email ?? "",
          role: ['GARCOM', 'GERENTE'] as TipoUsuario[],
          tipo: 'GERENTE',
          id_usuario: credenciais.user.uid
        }
      }

      console.log("usuário logado:", usuario);
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
      return true
    } catch (erro: any) {
      console.error("Erro ao fazer login:", erro.message);
      return false
    }
  },

  logoutUsuario: async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('usuario')
      console.log("Usuário deslogado");
    } catch (error) {
      console.log('erro ao fazer logout ', error)
    }
  },

  verificarLogin: async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem('usuario') ?? "") as Usuario
    } catch (error) {
      console.log('erro ao tentar recuperar o usuario')
    }
  }


}