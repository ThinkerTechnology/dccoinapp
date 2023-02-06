import {
  faCamera,
  faEarth,
  faHome,
  faNotEqual,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import {View, Text, Image} from 'react-native';
import React from 'react';
import CustomDrawer from './CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import  Dashbord from '../screen/Dashbord';
import Profile from '../screen/Profile';
import AddressBook from '../screen/AddressBook';
// import Setting from '../screen/Setting';

const Drawer = createDrawerNavigator();
const SaidBar = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#5f9ea0',
        drawerActiveTintColor: '',
        drawerInactiveTintColor: 'white',
        drawerLabelStyle: {marginLeft: -24},
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        HeadersShown: false,
      }}
      >
      <Drawer.Screen
        name=" Dashbord"
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon
              icon={'faHome'}
              size={12}
              color="white"
            />
          ),
        }}>
        {props => < Dashbord {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Profile"
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon
              icon={'faHome'}
              size={12}
              color="white"
            />
          ),
        }}>
        {props => <Profile {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Address"
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon
              icon={' faHome'}
              size={12}
              color="white"
            />
          ),
        }}>
        {props => <AddressBook {...props} />}
      </Drawer.Screen>
      {/* <Drawer.Screen
        name="Setting"
        options={{
          drawerIcon: ({color}) => (
            <FontAwesomeIcon
              icon={' faHome'}
              size={12}
              color="white"
            />
          ),
        }}>
        {props => <Setting {...props} />}
      </Drawer.Screen> */}

    </Drawer.Navigator>
  );
};

export default SaidBar;
