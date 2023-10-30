import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Calender from './screens/calender';
import Upload from './screens/upload';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Calender' component={Calender} />
        <Tab.Screen name='Upload' component={Upload} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}