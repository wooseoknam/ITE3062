import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Calendar from './screens/calendar';
import Upload from './screens/upload';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name='Calendar' component={Calendar} options={{unmountOnBlur: true}}/>
        <Tab.Screen name='Upload' component={Upload} options={{unmountOnBlur: true}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}