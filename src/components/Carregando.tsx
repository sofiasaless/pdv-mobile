import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";

export function Carregando() {
  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '50%' }} >
      <Spinner />
    </View>
  )
}