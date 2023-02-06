import {Text, View, TouchableOpacity,Animated, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import React, {useRef, useState} from 'react';
import { config } from 'dotenv';

const AccordionItem = ({title, bodyText}) => {

  const [showContent, setShowContent] = useState(false);
  const animationController =useRef(new Animated.Value(0)).current;

  const togglrisItem=()=>{
    const config={
        duration:300,
        toValue:showContent ? 0:1,
        useNativeDriver: true,
    };
    Animated.timing(animationController,config).start();
    setShowContent(!showContent);
}
    const arrowTransform= animationController.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','90deg']
    });
 
  return (
    <SafeAreaView>
    <View
      style={{
        width: '100%',
        padding: '2%',
        borderRadius: 12,
        backgroundColor: '#fff',
        marginBottom: '2%',
        overflow: 'hidden',
      }}>
      <TouchableOpacity   activeOpacity={0.8} onPress={() => togglrisItem()}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
            {title}
          </Text>
          <Animated.View style={{transform:[{rotateZ:arrowTransform}]}}>
          <Ionicons name="angle-right" size={20} color="#0D6896" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={{paddingHorizontal: '2%', paddingVertical: '3%'}}>
          <Text style={{color:'#000'}}>{bodyText}</Text>
        </View>
      )}
    </View>
    </SafeAreaView>
  );
};

export default AccordionItem;
