import React, { ReactElement, ReactNode } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors, fonts } from "../theme/colors.theme"

interface BotaoProps {
  titulo: ReactNode,
  icone?: ReactElement,
  cor: string,
  onPress?: (e?: any) => any,
  disabled?: boolean,
  flex?: boolean
}

export const Botao: React.FC<BotaoProps> = ({ titulo, cor, icone, disabled, onPress, flex }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, 
        { 
          backgroundColor: (disabled)?colors.btn_desabilitado:cor,
          flex: (flex)?1:0
        }
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{titulo}</Text>
      {icone}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.font_family_medio,
    fontSize: 16,
    color: 'white'
  },
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 13,
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 8
  }
})