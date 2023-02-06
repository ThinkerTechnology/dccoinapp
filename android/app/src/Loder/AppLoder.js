import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {styles} from '../styles';
const AppLoder = () => {
  return (
    // <View style={{position:'relative'}}>

    
    <LottieView
      style={{
        // alignContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.3)',
        //  width:100,
        //  height:100,
        //  fontSize:50,
        //  position:'absolute',
        //  top:0,
        //  bottom:0,
        //  right:0,
        //  left:0,
        // zIndex: 1,
      }}
      source={require('../../../../assets/AppLoder.json')}
      autoPlay
      loop
    />
    // </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});

export default AppLoder;
