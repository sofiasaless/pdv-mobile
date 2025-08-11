export type Usuario = {
  tipo: TipoUsuario
  role: TipoUsuario[]
  email?: string,
  id_usuario?: string
}

export type TipoUsuario = 'GARCOM' | 'GERENTE'

export type UsuarioLogin = {
  tipo: TipoUsuario,
  senha: string
}