export type Usuario = {
  tipo: TipoUsuario
  role: TipoUsuario[]
  email: string
}

export type TipoUsuario = 'GARCOM' | 'GERENTE'