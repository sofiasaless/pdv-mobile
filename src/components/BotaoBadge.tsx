import React, { ReactElement, ReactNode } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors, fonts } from "../theme/colors.theme"

interface BotaoBadgeProps {
  titulo: ReactNode,
  icone?: ReactElement,
  cor: string,
  onPress?: (e?: any) => any,
  disabled?: boolean,
  flex?: boolean,
  badgeNumber?: number,
  badgeText?: string
}

export const BotaoBadge: React.FC<BotaoBadgeProps> = ({ 
  titulo, 
  cor, 
  icone, 
  disabled, 
  onPress, 
  flex,
  badgeNumber,
  badgeText
}) => {
  return (
    <View style={{ position: 'relative', flex: flex ? 1 : 0 }}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container, 
          { 
            backgroundColor: disabled ? colors.btn_desabilitado : cor,
            flex: flex ? 1 : 0
          }
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>{titulo}</Text>
        {icone}
      </TouchableOpacity>

      {badgeNumber !== undefined && badgeNumber > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badgeNumber} {badgeText}</Text>
        </View>
      )}
    </View>
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
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  }
})
