import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color, FontSize } from '../../core/constants/StyleCommon';
import { bottomNavigator } from '../../core/constants/navigator';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <Tab.Navigator
            initialRouteName={"BottomMenu"}
            // headerShown={false}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Color.darkBackground,
                    borderColor: Color.darkBackground,
                },
            }}
        >
            {
                bottomNavigator.map((it, index) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={it.name}
                            component={it.component}
                            options={{
                                tabBarIcon: ({ focused, color, size }) => {
                                    return (
                                        <Ionicons
                                            name={focused ? it.focused : it.unFocused}
                                            size={FontSize.fontLarge}
                                            color={focused ? Color.greenText : Color.backgroundBtn}
                                        />
                                    )
                                },
                            }}
                        />
                    )
                })
            }

        </Tab.Navigator>
    );
}

export default BottomMenu