import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashbord from '../screen/Dashbord';
import Profile from '../screen/Profile';
import News from '../screen/News';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swap from '../screen/Swap';
import Stacking from '../screen/Stacking';

const TabBar = props => {
  const {navigation, setIsLoggedIn} = props;
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Swap') {
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          } else if (route.name === 'Staking') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFCC00',
        tabBarInactiveTintColor: '#fff',
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,  
        tabBarStyle: {
          activeTinatColor: '#2160f3',
          inactiveTintColor: '#000',
          showLabel: false,
          backgroundColor: '#0D6896',
          height: 70, 
          paddingBottom:8,
          width:'100%',  
        },
        headerShown: false,
      })}>
      <Tab.Screen name="News" setIsLoggedIn={setIsLoggedIn} >
      {props => <News setIsLoggedIn={setIsLoggedIn} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Home" setIsLoggedIn={setIsLoggedIn} >
      {props => <Dashbord setIsLoggedIn={setIsLoggedIn} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Swap" setIsLoggedIn={setIsLoggedIn} >
      {props => <Swap setIsLoggedIn={setIsLoggedIn} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Staking" component={Stacking} />
      <Tab.Screen name="Profile" setIsLoggedIn={setIsLoggedIn}>
        {props => <Profile setIsLoggedIn={setIsLoggedIn} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBar;
