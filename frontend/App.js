import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalendarPage from './screens/calendarpage';
import Upload from './screens/upload';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from './screens/detail'
import Community from './screens/community';
import MyPage from './screens/MyPage';
import CommunityDetail from './screens/communitydetail';

const Tab = createBottomTabNavigator();

const TabScreens = () => (
  <Tab.Navigator>
    <Tab.Screen name='Calendar' component={CalendarPage} options={{ unmountOnBlur: true }} />
    <Tab.Screen name='Community' component={Community} options={{ unmountOnBlur: true }} />
    <Tab.Screen name='MyPage' component={MyPage} options={{ unmountOnBlur: true }} />
    {/* <Tab.Screen name='Upload' component={Upload} options={{ unmountOnBlur: true }} /> */}
  </Tab.Navigator>
);

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Tabs' component={TabScreens} />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen name='CommunityDetail' component={CommunityDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}