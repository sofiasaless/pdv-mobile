import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackRoutes from "./StackRoutes";

import { enableScreens } from 'react-native-screens';
import { ProtectedPageLayout } from "../layout/ProtectedPageLayout";
enableScreens();

export default function Routes(){
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <ProtectedPageLayout>
          <StackRoutes/>
        </ProtectedPageLayout>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}