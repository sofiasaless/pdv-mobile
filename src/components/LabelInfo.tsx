import { Card, Layout, Text, useTheme } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

interface LabelInfoProps {
  tema: 'danger' | 'success' | 'primary',
  descricao: 'livres' | 'ocupadas' | 'aguardando' | string,
  tamanhoLetra: 'label' | 'c1' | 's1' | 's2' | 'h5'
}

export const LabelInfo: React.FC<LabelInfoProps> = ({ tema, descricao, tamanhoLetra }) => {
  const theme = useTheme();

  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [textColor, setTextColor] = useState<string>('')

  useEffect(() => {
    if (tema === 'primary') {
      setBackgroundColor('color-primary-200')
      setTextColor('color-primary-800')
    } else if (tema === 'success') {
      setBackgroundColor('color-success-200')
      setTextColor('color-success-700')
    } else {
      setBackgroundColor('color-danger-200')
      setTextColor('color-danger-800')
    }
  }, [tema])

  return (
    <View
      style={{
        borderRadius: 5,
        padding: 5,
        backgroundColor: theme[backgroundColor]
      }}
    >
      <Text category={tamanhoLetra}
        style={{
          color: theme[textColor]
        }}
      >{descricao.toUpperCase()}</Text>
    </View>
  );
}