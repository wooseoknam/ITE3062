import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Calendar from './screens/calendar';
import Upload from './screens/upload';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function StackScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Calendar}/>
            <Tab.Screen name="Upload" component={Upload}/>
        </Tab.Navigator>
    )
}

function Navigation() {
    return (
        <NavigationContainer>
            <StackScreen></StackScreen>
        </NavigationContainer>
    )
}

export default Navigation;