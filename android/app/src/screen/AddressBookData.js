import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Headers from '../Header/Headera';

const AddressBookData = props => {
  const {navigation} = props;
  return (
    <>
      <View style={styles.containerDasboard}>
      <View>
      <TouchableOpacity  activeOpacity={0.8} onPress={() => navigation.push('Aptos')}>
        <View style={styles.aptosIcon}>
          <View style={styles.AptosImg}>
            <Image
              source={require('../image/Aptos.png')}
              style={styles.aptos}
            />
            <Text
              style={{marginLeft: 10, fontSize: 14, color: '#000'}}
              >
              Aptos
            </Text>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Avalanche')}>
        <View style={styles.aptosIcon}>
          <View style={styles.AptosImg}>
            <Image
              source={require('../image/avalanche.png')}
              style={styles.aptos}
            />
            <Text
              style={{marginLeft: 10, fontSize: 14, color: '#000'}}
              // onPress={() => navigation.push('AddressBookData')}
              >
              Avalanche
            </Text>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Ethereum')}>

        <View style={styles.aptosIcon}>
          <View style={styles.AptosImg}>
            <Image
              source={require('../image/Ethereum.png')}
              style={styles.aptos}
            />
            <Text
              style={{marginLeft: 10, fontSize: 14, color: '#000'}}
               >
              Ethereum
            </Text>
          </View>
        </View>
        </TouchableOpacity>
 
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Polygon')}>
        <View style={styles.aptosIcon}>
          <View style={styles.AptosImg}>
            <Image
              source={require('../image/polygon.png')}
              style={styles.aptos}
            />
            <Text
              style={{marginLeft: 10, fontSize: 14, color: '#000'}}
               >
              Polygon
            </Text>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.push('Smart chain')}>
        <View style={styles.aptosIcon}>
          <View style={styles.AptosImg}>
            <Image
              source={require('../image/SmartChain.png')}
              style={styles.aptos}
            />
            <Text
              style={{marginLeft: 10, fontSize: 14, color: '#000'}}
               >
              Smart Chain
            </Text>
          </View>
        </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.push('Solana')}>

        <View style={styles.aptosIcon}>
          <View style={styles.AptosImg}>
            <Image
              source={require('../image/Solana.png')}
              style={styles.aptos}
            />
            <Text
              style={{marginLeft: 10, fontSize: 14, color: '#000'}}
              onPress={() => navigation.push('AddressBookData')}>
              Solana
            </Text>
          </View>
        </View>
        </TouchableOpacity> */}

      
        </View>
      </View>
    </>
  );
};

export default AddressBookData;
