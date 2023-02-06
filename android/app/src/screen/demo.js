import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { styles } from '../styles';

const Demoss = ({navigation}) => {
  // const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={{justifyContent: "center",
    height: responsiveHeight(100), // 50% of window height
    width: responsiveWidth(100), // 50% of window width
    alignItems: "center"}}>
      <View style={{}}>
        <Image
          source={require('../image/firstSee.png')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(30),
            // resizeMode: 'center',
          }}
        />
      </View>
      <View style={{}}>
        <Text
          style={{
            color: 'black',
            fontSize: responsiveFontSize(3),
            fontWeight: 'bold',
          }}>
          Experience the Benefits of Blockchain Technology
        </Text>
      </View>
      <View style={{}}>
        <Text
          style={{
            color: 'black',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: responsiveFontSize(2),
            // textAlign: 'center',
            marginTop:responsiveHeight(5),
            marginBottom:responsiveHeight(2),
          }}>
          Empowering shoppers, merchants, and partners with our open-source
          blockchain technology
        </Text>
      </View>
      <View style={styles.dotted}>
        <Text style={styles.firstcolor}></Text>
        <Text style={styles.inner}></Text>
        <Text style={styles.inner}></Text>
      </View>
      {/* <AppLoder/> */}
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: '#0D6896',
            borderRadius: responsiveWidth(5),
            width: responsiveWidth(90),
            height:responsiveHeight(5),
            justifyContent: 'center',
            alignItems:'center',marginTop:responsiveWidth(2)
          }}
          onPress={() =>
            navigation.navigate('SecondScreen', {screen: 'SecondScreen'})
          }>
          <Text
            style={{
              color: '#fff',
              fontSize: responsiveFontSize(2.1),
              fontWeight: 'bold',
              alignSelf: 'center',
              // textTransform: 'uppercase',
              //   marginBottom: 6,
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Demoss;
