import React, { ReactElement, ReactNode } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { colors, fonts, lightenColor } from "../theme/colors.theme"

interface BotaoOutlineProps {
  titulo: ReactNode,
  icone?: ReactElement,
  cor: string,
  onPress?: (e?: any) => any,
  disabled?: boolean,
  flex?: boolean
}

export const BotaoOutline: React.FC<BotaoOutlineProps> = ({ titulo, cor, icone, disabled, onPress, flex }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, 
        { 
          backgroundColor: (disabled)?colors.btn_desabilitado:cor,
          flex: (flex)?1:0,
          borderColor: cor,
          borderWidth: 2
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
    // paddingVertical: 13,
    gap: 10,
    alignItems: 'center',
    // paddingHorizontal: 8,
  }
})