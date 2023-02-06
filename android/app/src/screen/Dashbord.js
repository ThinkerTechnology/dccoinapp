import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DashboardTabs from './DashboardTabScreen/DashboardTabs';
import Searchedittoken from './DashboardTabScreen/SearchEdit/Searchedittoken';
import TokenBalancehide from './DashboardTabScreen/SearchEdit/TokenBalancehide';
import Tokenbalance from './DashboardTabScreen/Tokenslist/Tokenbalance';
import {REACT_APP_BASEURL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import AppLoder from '../Loder/AppLoder';
import {useIsFocused} from '@react-navigation/native';
import Clipboard, {useClipboard} from '@react-native-clipboard/clipboard';
import {Divider} from '@rneui/base';

const Dashbord = props => {
  const {navigation} = props;
  const isFocused = useIsFocused();
  // const [selectedLanguage, setSelectedLanguage] = useState();
  const [balance, setBalance] = useState('');

  const [address, setAddress] = useState();
  const [price, setPrice] = useState([]);
  const [add, setAdd] = useState([]);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('address');
  const [data, setString] = useClipboard();
  const [dccoin, setDCcoin] = useState({
    name: '',
    balance: 0,
    address: '',
  });
  // console.log(dccoin, 'dccoin');
  console.log(price, 'price');
  const interval = useRef();

  const fetchCopiedText = async () => {
    setString(selectedValue.toString());
    alert('Address copied');
  };

  const useData = async () => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    var raws = JSON.stringify({
      email: await AsyncStorage.getItem('email'),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raws,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}fetchuser`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        setAdd(result.result);
        setAddress(result.result[0].wallet_address);
      })
      .catch(error => console.log('error', error));
  };

  const AllData = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      address: selectedValue,
      network: 'bsc testnet',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}fetchBalance`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        // console.log(result, 'result');
        setIsLoading(false);
        if (result.data !== null) {
          setDCcoin(
            result.message.filter(item => item['name'] == 'DC-Coin' && item),
          );
          // console.log(
          //   result.message.filter(item => item['name'] == 'DC-Coin' && item),
          // );
          setResult(result.message);
        } else {
          console.log(result.data, 'deny');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const Balance = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      address: selectedValue,
      network: 'bsc_testnet',
      tokenType: 'BNB',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}fetchNativeBalance`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        setBalance(result.balance.toFixed(4));
      })
      .catch(error => console.log('error', error));
  };

  const cc = async () => {
    if (selectedValue != 'address') {
      selectedValue = await AsyncStorage.getItem('wallet_address');
      AllData();
    }
  };

  const Price = () => {
    var raw = '';

    var requestOptions = {
      method: 'GET',
      body: raw,
      redirect: 'follow',
    };

    fetch(`${REACT_APP_BASEURL}fetchPrice`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, 'res');
        setPrice(result.message);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    Balance();
    cc();
    useData();
    AllData();
    Price();
  }, [isFocused]);
  useEffect(() => {
    AllData();
    Balance();
  }, [selectedValue]);
  return (
    <>
      <SafeAreaView style={styles.containerDasboard}>
        {/* token balance div */}
        {/* <View>
          <TouchableOpacity onPress={() => navigation.push('Transfer')}>
            <View style={styles.tokenpointprice}>
              <View style={styles.tokenimages}>
                <View style={styles.tokenimages}>
                  <View>
                    <Image
                      source={require('../image/DC-Logo.png')}
                      style={{
                        height: 30,
                        width: 40,
                      }}
                    />
                  </View>
                  <View style={styles.pointtextcontainer}>
                    <Text style={styles.pricebalance}>
                      {address
                        ? address.slice(0, 5) + '...' + address.slice(36, 42)
                        : ''}
                    </Text>
                  </View>
                </View>
                <View style={styles.rightarroes}>
                  <Icon name="arrow-right" size={20} color="#4B56D2" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={styles.container}>
            <Picker
              selectedValue={selectedValue}
              style={{height: 40, color: '#fff'}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              {/* <Picker.Item label={'address'} value='address'/>  */}
              {add &&
                add.map((ele, idx) => (
                  <Picker.Item
                    label={
                      ele.wallet_address
                        ? ele.wallet_address.slice(0, 7) +
                          '...' +
                          ele.wallet_address.slice(32, 42)
                        : ''
                    }
                    value={ele.wallet_address}
                    key={idx}
                  />
                ))}
            </Picker>
          </View>
          <View
            style={{
              backgroundColor: '#0D6896',
              width: 70,
              height: 50,
              marginLeft: 5,
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => fetchCopiedText()}>
              <Icon name="copy" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {/* tabs bar section start */}
        {/* <View style={styles.tabsscreensdashboard}>
                    <DashboardTabs />
                </View> */}

        <ScrollView style={styles.scrollviewcss}>
          {/* <View>
            <Searchedittoken props={props} />
          </View> */}
          <View>
            {/* <TokenBalancehide /> */}

            <View style={styles.tokenhideparice}>
              <View>
                <Text style={{color: '#000', fontWeight: 'bold'}}>Balance</Text>
              </View>
              <View>
                <Text style={styles.pricebalance}>{balance} BNB</Text>
              </View>
            </View>
          </View>
          {/* <View>
            <Divider />
          </View> */}
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.push('SendToken')}
              style={{
                backgroundColor: '#0D6896',
                borderRadius: 30,
                paddingVertical: 8,
                paddingHorizontal: 8,
                width: '30%',
                borderColor: '#0D6896',
                borderWidth: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
               
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginBottom: 6,
                  }}>
                  SendToken
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}

          {/* <Tokenbalance /> */}
          <View style={styles.pricebalancecardadd}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.push('AddWallet')}>
              <View style={styles.tokenaddicons}>
                <Icon name="plus" size={20} color="#fff" />
                <Text style={styles.addwallets}>Add Wallet</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.pricebalancecardadd}>
            <TouchableOpacity onPress={() => navigation.push('ExportWallet')}>
              <View style={styles.tokenaddicons}>
                <Icon name="plus" size={20} color="#251B37" />
                <Text style={styles.addwallets}>Export Account</Text>
              </View>
            </TouchableOpacity>
          </View> */}
          {dccoin.length > 0 ? (
            dccoin.map((ele, idx) => (
              // ele.name == "DC-Coin" && setDCcoin({name: ele.name,balance:Number(Number(ele.balance/10 ** Number(ele.decimals))).toFixed(2),address:ele.token_address});
              <View style={styles.pricebalancecard} key={idx}>
                <View>
                  <View style={styles.tokenstarly}>
                    <View>
                      <Image
                        source={require('../image/conico.png')}
                        style={styles.tokenstartlyimg}
                      />
                    </View>
                    <View style={styles.pointtextcontainer}>
                      <Text style={styles.tokenStarlyname}>{ele.name}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ marginVertical: 8}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '400',
                          fontSize: 15,
                        }}>
                        {'INR :'}{' '}
                        {(
                          price *
                          Number(
                            Number(ele.balance / 10 ** Number(ele.decimals)),
                          )
                        ).toFixed(2)}
                      </Text>
                    </View>
                    <Text style={styles.tokenStarlynametwo}>
                      {Number(
                        Number(ele.balance / 10 ** Number(ele.decimals)),
                      ).toFixed(2)}
                      {' '}
                      {ele.symbol}
                    </Text>
                  </View>
                  <View style={[styles.tokenvalew, styles.margintops]}>
                    <View>
                      <Text style={styles.tokennames15}> ERC20</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          navigation.push('SendToken', {
                            sendToken: ele.token_address,
                            sendValue: ele.balance / 10 ** Number(ele.decimals),
                            name: ele.symbol,
                            selectedValue,
                          })
                        }>
                        <Text style={styles.tokennames15}>Send</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.pricebalancecard} key={0}>
              <View>
                <View style={styles.tokenstarly}>
                  <View>
                    <Image
                      source={require('../image/conico.png')}
                      style={styles.tokenstartlyimg}
                    />
                  </View>
                  <View style={styles.pointtextcontainer}>
                    <Text style={styles.tokenStarlyname}>{'DC-Coin'}</Text>
                  </View>
                </View>
                <View style={styles.tokenStarlynamecontaoner}>
                  <Text style={styles.tokenStarlynametwo}>
                    {Number(0)} {'DC-Coin'}
                  </Text>
                </View>
                <View style={[styles.tokenvalew, styles.margintops]}>
                  <View>
                    <Text style={styles.tokennames15}> ERC20</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <View style={styles.pricebalancecontainers}>
            {isLoading ? (
              <AppLoder />
            ) : result && result.length > 0 ? (
              result.map((ele, idx) => (
                // ele.name == "DC-Coin" && setDCcoin({name: ele.name,balance:Number(Number(ele.balance/10 ** Number(ele.decimals))).toFixed(2),address:ele.token_address});
                <View style={styles.pricebalancecard} key={idx}>
                  <View>
                    <View style={styles.tokenstarly}>
                      <View>
                        <Image
                          source={require('../image/conico.png')}
                          style={styles.tokenstartlyimg}
                        />
                      </View>
                      <View style={styles.pointtextcontainer}>
                        <Text style={styles.tokenStarlyname}>{ele.name}</Text>
                      </View>
                    </View>
                    <View style={styles.tokenStarlynamecontaoner}>
                      <Text style={styles.tokenStarlynametwo}>
                        {Number(
                          Number(ele.balance / 10 ** Number(ele.decimals)),
                        ).toFixed(2)}
                        {' '}
                        {ele.symbol}
                      </Text>
                    </View>
                    <View style={[styles.tokenvalew, styles.margintops]}>
                      <View>
                        <Text style={styles.tokennames15}> ERC20</Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() =>
                            navigation.push('SendToken', {
                              sendToken: ele.token_address,
                              sendValue:
                                ele.balance / 10 ** Number(ele.decimals),
                              name: ele.symbol,
                              selectedValue,
                            })
                          }>
                          <Text style={styles.tokennames15}>Send</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text style={{color: '#000', fontWeight: 'bold'}}>
                  You don't have a token
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashbord;
