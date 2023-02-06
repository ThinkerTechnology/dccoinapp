import React, { useEffect, useRef, useState } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {REACT_APP_BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tokenbalance = () => {
    const [balance, setBalance] = useState();
    const interval = useRef();
    const getData = async ()=>{
        setBalance(await AsyncStorage.getItem('balance'));
    }
    useEffect(() => {
    getData()
    }, [])
  const Data = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      address: await AsyncStorage.getItem('wallet_address'),
      network: 'bsc_testnet',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}fetchBalance`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log(result.currency);
        console.log('shubham',result);
        // await AsyncStorage.setItem('balance',result.balance)
        // console.log(await AsyncStorage.getItem('balance'),"setItem");
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    clearInterval(interval.current);
    // interval.current = setInterval(() => {        
        Data();
    // }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <View style={styles.pricebalancecontainers}>
      <View style={styles.pricebalancecard}>
        <View>
          <View style={styles.tokenstarly}>
            <View>
              <Image
                source={require('../../../image/startly-token-icon.png')}
                style={styles.tokenstartlyimg}
              />
            </View>
            <View style={styles.pointtextcontainer}>
              <Text style={styles.tokenStarlyname}>Starly Token</Text>
            </View>
          </View>
          <View style={styles.tokenStarlynamecontaoner}>
            <Text style={styles.tokenStarlynametwo}>0 Starly Token</Text>
          </View>
          <View style={[styles.tokenvalew, styles.margintops]}>
            <View>
              <Text style={styles.tokennames15}>0 ERC20</Text>
            </View>
            <View>
              <Text style={styles.tokennames15}>~~gbp</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.pricebalancecardtwo}>
        <View>
          <View style={styles.tokenstarly}>
            <View>
              <Image
                source={require('../../../image/startly-token-icon.png')}
                style={styles.tokenstartlyimg}
              />
            </View>
            <View style={styles.pointtextcontainer}>
              <Text style={styles.tokenStarlyname}>Starly Token</Text>
            </View>
          </View>
          <View style={styles.tokenStarlynamecontaoner}>
            <Text style={styles.tokenStarlynametwo}>0 Starly Token</Text>
          </View>
          <View style={[styles.tokenvalew, styles.margintops]}>
            <View>
              <Text style={styles.tokennames15}>0 ERC20</Text>
            </View>
            <View>
              <Text style={styles.tokennames15}>~~gbp</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.pricebalancecard3}>
        <View>
          <View style={styles.tokenstarly}>
            <View>
              <Image
                source={require('../../../image/startly-token-icon.png')}
                style={styles.tokenstartlyimg}
              />
            </View>
            <View style={styles.pointtextcontainer}>
              <Text style={styles.tokenStarlyname}>Starly Token</Text>
            </View>
          </View>
          <View style={styles.tokenStarlynamecontaoner}>
            <Text style={styles.tokenStarlynametwo}>0 Starly Token</Text>
          </View>
          <View style={[styles.tokenvalew, styles.margintops]}>
            <View>
              <Text style={styles.tokennames15}>0 ERC20</Text>
            </View>
            <View>
              <Text style={styles.tokennames15}>~~gbp</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.pricebalancecardadd}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.tokenaddicons}>
            <Icon name="plus" size={20} color="#251B37" />
            <Text style={styles.addwallets}>Add Wallet</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tokenbalance;
