/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import BottomMenu from './src/infrastructure/layouts/bottom-menu';
import LoginScreen from './src/screen/login/login';
import RegisterScreen from './src/screen/login/register';
import { PermissionsAndroid, Platform } from 'react-native';

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
      <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const requestPermissions = async () => {
  if (Platform.OS === "android" && Platform.Version >= 29) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("ACTIVITY_RECOGNITION Permission Granted");
      } else {
        console.error("ACTIVITY_RECOGNITION Permission Denied");
      }
    } catch (err) {
      console.warn("Permission Error:", err);
    }
  }
};

function App(): React.JSX.Element {
  useEffect(() => {
    requestPermissions(); // Yêu cầu quyền khi ứng dụng khởi chạy
  }, []);
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}



export default App;
