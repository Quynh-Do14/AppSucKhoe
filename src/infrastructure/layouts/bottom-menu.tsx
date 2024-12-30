import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color, FontSize } from '../../core/constants/StyleCommon';
import { bottomNavigator } from '../../core/constants/navigator';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            // headerShown={false}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: Color.lightBackground,
                    borderColor: Color.lightBackground,
                    borderRadius: 20,
                    height: 60,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 6,
                    marginHorizontal: 12,
                    marginBottom: 8 
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
                                            color={focused ? Color.darkBlueBackground : Color.lightBorder}
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