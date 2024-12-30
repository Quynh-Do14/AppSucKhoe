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
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import ParameterScreen from './src/screen/profile/edit';
import messaging from '@react-native-firebase/messaging';
import HealthScreen from './src/screen/profile/heath';

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
      <Stack.Screen name={"ParameterScreen"} component={ParameterScreen} />
      <Stack.Screen name={"HealthScreen"} component={HealthScreen} />

    </Stack.Navigator>
  );
};

const NAVIGATION_IDS = ["home", "settings"];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === "home") {
    return 'myapp://home';
  }
  if (navigationId === "settings") {
    return 'myapp://settings';
  }

  return null
}

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: "home",
      Settings: "settings"
    }
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);

    });
    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
}

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

const requestUserPermission = async () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const token = await messaging().getToken();
    console.log('FCM token:', token);
  }
};

function App(): React.JSX.Element {
  useEffect(() => {
    requestPermissions(); // Yêu cầu quyền khi ứng dụng khởi chạy
    requestUserPermission()
  }, []);

  useEffect(() => {
    // Foreground notification listener
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('New Notification', remoteMessage.notification.body);
    });

    // Background/Terminated state notification handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);


  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  };

  useEffect(() => {
    getFCMToken();

    // Refresh token on change
    const unsubscribe = messaging().onTokenRefresh((token) => {
      console.log('FCM Token refreshed:', token);
    });

    return unsubscribe;
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
