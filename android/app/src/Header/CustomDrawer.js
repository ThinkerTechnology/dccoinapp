import {View, Text,Image} from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { styles } from '../styles';

const CustomDrawer = (props) => {
  return (
    <View style={{flex: 1,backgroundColor:'black'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8080'}}>
        <Image
          source={require('../image/DC_Logo.png')}
          style={{
            height: 115,
            width: 121,
            marginBottom: 10,
            marginLeft: 75,
            marginRight: 25,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View style={{flex: 1, backgroundColor: 'black', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
 
    </View>
  );
};

export default CustomDrawer;
