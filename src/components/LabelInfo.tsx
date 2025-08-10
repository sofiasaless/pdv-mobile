import { Card, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusMesa } from "../types/mesa.type";

interface LabelInfoProps {
  descricao: StatusMesa,
  tamanhoLetra: 'label' | 'c1' | 's1' | 's2' | 'h5'
}

export const LabelInfo: React.FC<LabelInfoProps> = ({ descricao, tamanhoLetra }) => {
  const theme = useTheme();

  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [textColor, setTextColor] = useState<string>('')

  useEffect(() => {
    if (descricao === 'disponivel') {
      setBackgroundColor('color-primary-200')
      setTextColor('color-primary-800')
    } else if (descricao === 'ocupada') {
      setBackgroundColor('color-success-200')
      setTextColor('color-success-700')
    } else {
      setBackgroundColor('color-danger-200')
      setTextColor('color-danger-800')
    }
  }, [descricao])

  return (
    <View
      style={[styles.labelContainer, {
        backgroundColor: theme[backgroundColor]
      }]}
    >
      <Text category={tamanhoLetra}
        style={{
          color: theme[textColor]
        }}
      >{descricao.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    borderRadius: 5,
    padding: 5,
  }
})