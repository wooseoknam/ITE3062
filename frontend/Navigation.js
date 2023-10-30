import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Calender from './screens/calender';
import Upload from './screens/upload';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackScreen() {
    return (
        // <Stack.Navigator initialRouteName="Calender">
        //     <Stack.Screen name='Calender' component={Calender}></Stack.Screen>
        //     <Stack.Screen name='Upload' component={Upload}></Stack.Screen>
        // </Stack.Navigator>
        <Tab.Navigator >
            <Tab.Screen name="Home" component={Calender} />
            <Tab.Screen name="Upload" component={Upload} />
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