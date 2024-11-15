/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RecoilRoot } from 'recoil';
import BottomMenu from './src/infrastructure/layouts/bottom-menu';
import LoginScreen from './src/screen/login/login';
import RegisterScreen from './src/screen/login/register';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {


  return (
    <Stack.Navigator
      initialRouteName={"LoginScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={"BottomMenu"}
        component={BottomMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
      <Stack.Screen name={"RegisterScreen"} component={RegisterScreen } />
      

    </Stack.Navigator>
  );
};
function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}



export default App;
