import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoder from '../Loder/AppLoder';
import {Picker} from '@react-native-picker/picker';
import {REACT_APP_BASEURL} from '@env';
import '../../../../ global';
import { useIsFocused } from '@react-navigation/native';

const Swap = props => {
    const isFocused = useIsFocused();
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('address');
  const [selectedValues, setSelectedValues] = useState('BNB');
  const [add, setAdd] = useState([]);
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState('0');
  const [value, setValue] = useState('0');
  const [contract, setContract] = useState();
  const [tokenAmount, setTokenAmount] = useState(0);
  const [bnbPrice, setBnbPrice] = useState(0);
  const [tokenPerUsd, setTokenPerUsd] = useState(0);
  const [usdtPrice, setUsdtPrice] = useState(0);
  const [tokenPerUsdUsdt, setTokenPerUsdUsdt] = useState(0);
  const [dcbalance, setDcbalance] = useState(0);

  const swapSubmit = async () => {
    if (value == 0 || value == undefined || value == '' || value == null) {
      alert('Please provide a valid value');
      return;
    }
    if(balance == 0 || balance == undefined ||balance == '' ||balance == null){
      alert('Insufficent funds');
      return;
    }
   
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      email: await AsyncStorage.getItem('email'),
      address: selectedValue,
      amount: value,
      tokenType: selectedValues,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}swap`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        if (result.message !== 'Transaction Successfull') {
          alert('Insufficent funds for transfer');
        } else {
          setValue('');
          Balance();
          setProviders();
          alert('Transaction Successfull');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const max = () => {
    setValue(Number(balance).toFixed(6));
  };

  const Balance = async () => {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      address: selectedValue,
      network: 'bsc_testnet',
      tokenType:selectedValues
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

  const setProvider = async () => {
    const Web3 = require('web3');
    const web3 = new Web3('https://rpc.ankr.com/bsc_testnet_chapel');

    // // The ABI (Application Binary Interface) of the contract
    const abi = [
      {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        inputs: [],
        name: 'USDT',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        name: '_airaddress',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        name: '_useraddress',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'airdrop',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'ref_address', type: 'address'},
        ],
        name: 'airdropTokens',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: '_amount', type: 'uint256'},
          {internalType: 'address', name: 'currency', type: 'address'},
        ],
        name: 'bnbToToken',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: '_currency', type: 'address'},
          {internalType: 'uint256', name: '_amount', type: 'uint256'},
        ],
        name: 'buyToken',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: '_tpsBNB', type: 'uint256'},
          {internalType: 'uint256', name: '_tpsUSDT', type: 'uint256'},
        ],
        name: 'changePrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'dropLimit',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'dropTokens',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'endDate',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLatestPriceBnb',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getLatestPriceUSDT',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'hasStart',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'priceFeedBnb',
        outputs: [
          {
            internalType: 'contract AggregatorV3Interface',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'priceFeedUSDT',
        outputs: [
          {
            internalType: 'contract AggregatorV3Interface',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'rewards',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: '_endDate', type: 'uint256'},
          {internalType: 'uint256', name: '_startDate', type: 'uint256'},
        ],
        name: 'setDate',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: '_airdrop', type: 'uint256'},
          {internalType: 'uint256', name: '_rewards', type: 'uint256'},
        ],
        name: 'setDrop',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'startDate',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'bool', name: '_sale', type: 'bool'}],
        name: 'toggleSale',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'token',
        outputs: [{internalType: 'contract IBEP20', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'tokenPerUsdBNB',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'tokenPerUsdUSDT',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalBNB',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalUSDT',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: '_currency', type: 'address'}],
        name: 'withdrwal',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];

    // The address of the deployed contract
    const contractAddress = '0x04a2e022b1C90a55957F87cDC685Ce4c8A76929A';
    const contract = new web3.eth.Contract(abi, contractAddress);

    let BNBPrice = await contract.methods.getLatestPriceBnb().call();
    let tokenPerUsdBNB = await contract.methods.tokenPerUsdBNB().call();
    let USDTPrice = await contract.methods.getLatestPriceUSDT().call();
    let tokenPerUsdUsdt = await contract.methods.tokenPerUsdUSDT().call();
    setBnbPrice(BNBPrice);
    setTokenPerUsd(tokenPerUsdBNB);
    setUsdtPrice(USDTPrice);
    setTokenPerUsdUsdt(tokenPerUsdUsdt);
    setContract(contract);
  };

  const setValues = async () => {
    
    if (value == '' || value == null || value == undefined) {
      setTokenAmount(0);
      return;
    }

    if (selectedValues == 'BNB') {
      var amount = Number(value) * Number(bnbPrice);
      amount = Number(amount) * Number(tokenPerUsd);
      setTokenAmount(amount);
      Balance();

    } else if (selectedValues == 'USDT') {
      var amount = Number(value) * Number(usdtPrice);
      amount = Number(amount) * Number(tokenPerUsdUsdt);
      setTokenAmount(amount);
      Balance();
     
    }
  };
  const setProviders = async () => {
    const Web3 = require('web3');
    const web3 = new Web3('https://rpc.ankr.com/bsc_testnet_chapel/');
    const abi = [
      {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {indexed: true, internalType: 'address', name: 'to', type: 'address'},
          {
            indexed: false,
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {internalType: 'address', name: 'owner', type: 'address'},
          {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'burn',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'burnToken',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getOwner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'spender', type: 'address'},
          {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'mint',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'address', name: 'sender', type: 'address'},
          {internalType: 'address', name: 'recipient', type: 'address'},
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    const contractAddress = '0xeA871b31b6Dfd656097115B1dF98E4e1A74ee796';
    const contract = new web3.eth.Contract(abi, contractAddress);
    let balance =
      (await contract.methods.balanceOf(selectedValue).call()) / 1e18;
    let  balances=balance.toFixed(4);
    setDcbalance(balances);
  };

  const checkWallet = async () => {
    if (selectedValue != 'address') {
      selectedValue = await AsyncStorage.getItem('wallet_address');
      Balance();
    }
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

  useEffect(() => {

    // const unsubscribe = navigation.addListener('focus', () => {
      
    setProvider();
    setProviders();
    useData();
    checkWallet();
    // });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;

  }, [isFocused]);

  useEffect(() => {
    setValues();
  }, [value]);

  useEffect(() => {
    Balance();
    useData();
    setProviders();
    setValue();
    // swapSubmit();
  }, [selectedValue]);

  useEffect(() => {
    setValues();
    Balance();
    // swapSubmit();
  }, [selectedValues]);

  return (
    <>
      <ScrollView style={styles.swaphad}>
        <View>
          <View style={styles.swapcontainers}>
            <View style={styles.swapHAD}>
              <Text style={styles.swapHADText}>Swap </Text>
              <Text style={styles.swapHADTe}>
                It is a long established fact that a reader will be disstracted
                by the readable Content of a page when looking at its layout
              </Text>
            </View>

            <View style={styles.Dividerline}>
              <Divider />
            </View>
            <View
              style={{
                backgroundColor: '#0D6896',
                padding: 5,
                borderRadius: 28,
                marginTop: 15,
                marginBottom: 15,
                justifyContent: 'center',
              }}>
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

            <View style={styles.swapbalancecard}>
              <View>
                <Text style={{color: '#000', fontSize: 16, paddingBottom: 10}}>
                  Please Enter the DO Amount
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#0D6896',
                  borderColor: '#ffffffa8',
                  // borderWidth: 0.2,
                  borderRadius: 5,
                  padding: 10,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    alignContent: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text style={{color: '#fff'}}>From</Text>
                  </View>
                  <View>
                    <Text style={{color: '#FBDF07'}}>Bal:{balance}</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    marginVertical: 10,
                    backgroundColor: '#fff',
                    width: '18%',
                    borderRadius: 5,
                    // borderColor: '#CEE5D0',
                    // borderWidth: 1,
                  }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => max()}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 13,
                        paddingVertical: 5,
                        fontWeight: '700',
                        marginLeft: 10,
                      }}>
                      MAX
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 1,
                      alignContent: 'flex-start',
                      flexDirection: 'row',
                    }}>
                    <TextInput
                      placeholder="0.00"
                      placeholderTextColor="#fff"
                      autoCapitalize="none"
                      style={{
                        paddingLeft: 10,
                        color: '#fff',
                        borderColor: '#a3a3a3a8',
                        borderWidth: 0.5,
                        marginTop: 2,
                        marginBottom: 20,
                        borderRadius: 5,
                        height: 45,
                        width: '90%',
                      }}
                      value={value}
                      keyboardType="numeric"
                      // onSubmitEditing={Keyboard.dismiss}

                      onChangeText={text => setValue(text)}
                    />
                  </View>
                  <View
                    style={{
                      // backgroundColor: '#FFCC00',
                      borderRadius: 5,
                      marginTop: 2,
                      borderWidth: 1,
                      borderColor: '#a3a3a3a8',
                      justifyContent: 'center',
                      width: '40%',
                      height: 45,
                    }}>
                    <Picker
                      selectedValue={selectedValues}
                      style={{height: 30, color: '#fff'}}
                      onValueChange={(itemValues, itemIndexs) =>
                        setSelectedValues(itemValues) 
                      }>
                      <Picker.Item label={'BNB'} value="BNB" />
                      <Picker.Item label={'USDT'} value="USDT" />
                      {/* {add &&
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
                  ))} */}
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.swapicons}>
                <Icon
                  name="arrow-down-circle-outline"
                  size={40}
                  color="#0D6896"
                  style={styles.iconswaping}
                />
              </View>

              <View
                style={{
                  backgroundColor: '#0D6896',
                  borderColor: '#ffffffa8',
                  // borderWidth: 0.2,
                  borderRadius: 5,
                  padding: 15,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                  }}>
                  <View>
                    <Text style={{color: '#fff'}}>To</Text>
                  </View>
                  <View>
                    <Text style={{color: '#FBDF07'}}>Bal:{dcbalance}</Text>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    flex: 1,
                    paddingBottom:10,
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                      color: '#fff',
                      borderColor: '#a3a3a3a8',
                      borderWidth: 0.5,
                      borderRadius: 5,
                      height: '100%',
                      width: '100%', 
                    }}>
                    {tokenAmount}
                  </Text>
                  {/* <TextInput
                    value={tokenAmount}
                    // placeholder="0.0"
                    editable={true}
                    placeholderTextColor="#2160f3"
                    autoCapitalize="none"
                    style={{
                      paddingLeft: 10,
                      color: '#000',
                      borderColor: '#6D9886',
                      borderWidth: 1,
                      marginTop: 4,
                      marginBottom: 30,
                      borderRadius: 5,
                      height: 55,
                    }}
                    keyboardType="numeric"
                    // onSubmitEditing={Keyboard.dismiss}

                    // onChangeText={text => setTokenAmount(text)}
                  /> */}
                </View>
              </View>

              <View style={styles.swapbuttonConten}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.swapButtonContainer}
                  onPress={() => swapSubmit()}>
                  <Text style={styles.swapButtonText}>Swap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {isLoading && <AppLoder />}
      </ScrollView>
    </>
  );
};

export default Swap;
