import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles';
import {Divider} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_BASEURL} from '@env';

import {useIsFocused} from '@react-navigation/native';
import AppLoder from '../Loder/AppLoder';
const Stacking = props => {
  const isFocused = useIsFocused();
  const {navigation} = props;
  const [selectedValue, setSelectedValue] = useState('address');
  const [selectedValues, setSelectedValues] = useState('10');
  const [add, setAdd] = useState([]);
  const [address, setAddress] = useState();
  const [dcbalance, setDcbalance] = useState(0);
  const [value, setValue] = useState('0');

  const [stakes, setStakes] = useState([]);
  const [contractInstance, setContractInstance] = useState('');
  const [rewards, setRewards] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [stakId, setStakId] = useState('');
  const [userId, setUserId] = useState('');
  const [timeDay, setTimeDay] = useState('');
  const [isEnable, setIsEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState('10');
  //unstacklClick butten
  const unStakeClick = async (stakeId, id) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      address: selectedValue,
      id: id,
      stakeId: stakeId,
      email: await AsyncStorage.getItem('email'),
    });
    // return;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}unStake`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        if (result.message !== 'Transaction Successfull') {
          alert('Insufficent Balance');
          unStake();
        } else {
          unStake();
          alert('Transaction Successfull');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const Stacking = async () => {
    if (dcbalance == 0 || dcbalance == undefined || dcbalance == '') {
      alert('insufficient funds');
      return;
    }
    if (value == 0 || value == undefined || value == '') {
      alert('Please provide a valid value');
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      address: selectedValue,
      email: await AsyncStorage.getItem('email'),
      amount: value,
      time: selectedValues,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(`${REACT_APP_BASEURL}depositeToken`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        if (result.message !== 'Transaction Successfull') {
          alert(result.message);
        } else {
          setProviders('');
          alert('Transaction Successfull');
        }

        setValue('');
        unStake();
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const unStake = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      address: selectedValue,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setStakes([]);
    fetch(`${REACT_APP_BASEURL}fetchStaking`, requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.message) {
          setStakes([]);
        } else {
          if (result.result.length > 0) {
            let i = 0;
            while (i < result.result.length) {
              let times = new Date(Number(result.result[i].time) * 1000);
              let time =
                times.getDate() +
                '-' +
                times.getMonth() +
                1 +
                '' +
                '-' +
                times.getFullYear();
              let cur = new Date().getTime();
              let withdrawTimes = new Date(
                Number(result.result[i].withdrawTime) * 1000,
              );
              // let timeSatamp =withdrawTime*1000;
              let withdrawTime =
                withdrawTimes.getDate() +
                '-' +
                withdrawTimes.getMonth() +
                1 +
                '' +
                '-' +
                withdrawTimes.getFullYear();
              let investedAmount = result.result[i].amount;
              let userId = result.result[i].id;
              let stakId = result.result[i].stakeId;
              let rewards =
                Number(await contractInstance.methods
                  .calclulateReward(result.result[i].stakeId)
                  .call()) / 1e18;
              let currentTime = Math.floor(new Date().getTime() / 1000);
              let obj = {
                investedAmount: Number(investedAmount).toFixed(4),
                rewards: Number(rewards).toFixed(4),
                time,
                withdrawTime,
                withInSec: Number(result.result[i].withdrawTime),
                currentTime,
                userId,
                stakId,
              };
              // console.log(obj,"obj")
              setStakId(stakId), setUserId(userId), setTimeDay(time);
              setInvestedAmount(investedAmount);
              setRewards(rewards);
              setStakes(prev => [...prev, obj]);
              i++;
            }
          }
        }
      })
      .catch(error => console.log('error', error));
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

    let balances =
      (await contract.methods.balanceOf(selectedValue).call()) / 1e18;

    setDcbalance(balances.toFixed(4));
  };

  const setProvider = async () => {
    const Web3 = require('web3');
    const web3 = new Web3('https://rpc.ankr.com/bsc_testnet_chapel');
    const abi = [
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
        name: 'APY',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        name: 'Stack',
        outputs: [
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
          {internalType: 'address', name: 'userAddress', type: 'address'},
          {internalType: 'uint256', name: 'time', type: 'uint256'},
          {internalType: 'uint256', name: 'stackId', type: 'uint256'},
          {internalType: 'bool', name: 'isWithdrawal', type: 'bool'},
          {internalType: 'uint256', name: 'withdrawalTime', type: 'uint256'},
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: 'id', type: 'uint256'}],
        name: 'calclulateReward',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: 'id', type: 'uint256'}],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'currentID',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {internalType: 'uint256', name: 'amount', type: 'uint256'},
          {internalType: 'uint256', name: 'time', type: 'uint256'},
        ],
        name: 'deposite',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'divider',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'maximumDepositeAmount',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'minimumDepositeAmount',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
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
        name: 'stakedToken',
        outputs: [{internalType: 'contract IBEP20', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        name: 'stakeholders',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [{internalType: 'bool', name: '_isStart', type: 'bool'}],
        name: 'toggleStacking',
        outputs: [],
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
      {
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'withdrawl',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
    const contractAddress = '0xe09DD181F544E40e717e66854c0928FD41315cCC';
    const contract = new web3.eth.Contract(abi, contractAddress);
    setContractInstance(contract);
  };

  const checkWallet = async () => {
    if (selectedValue != 'address') {
      selectedValue = await AsyncStorage.getItem('wallet_address');
      unStake();
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

  const max = () => {
    setActive('max');
    setValue(dcbalance.toString());
  };
  const thirtypercentage = () => {
    setActive('30');
    var thirty = (dcbalance * 30) / 100;
    setValue(thirty.toString());
  };

  const tanpercentage = () => {
    setActive('10');
    var tan = (dcbalance * 10) / 100;
    setValue(tan.toString());
  };

  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    // unStake();
    setProvider();
    useData();
    checkWallet();
    setProviders();
    // });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
  }, [isFocused]);

  useEffect(() => {
    useData();
    setProviders();
    unStake();
  }, [selectedValue]);

  return (
    <>
      {/* <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // style={{flex: 1 , ...state}}
      > */}
      <ScrollView
        // ref={ref => (scrollView = ref)}
        // style={{...styles.stakinghad, ...state}}
        // contentContainerStyle={{flex: 1}}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}
        bounces={false}>
        <View style={styles.stakingcontainers}>
          <View style={styles.StakingHAD}>
            <Text style={styles.stakingHADText}>Start Stacking</Text>
            <Text style={styles.stakingHADTe}>
              Enter how much DO you want to stake and how much time you will
              stake for
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
              // borderWidth: 1,
              // borderColor: '#6D9886',
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
<View style={{backgroundColor: '#f1faff00',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginVertical: 5,}}>
          <View
            style={{
              backgroundColor: '#0D6896',
              borderColor: '#E6E2C3',
              borderWidth: 1,
              borderRadius: 15,
              padding: 15,
              marginVertical: 5,
            }}>
            <View style={styles.stakingbalancecard}>
              {/* <View>
                <Text style={styles.bnbswap}>Enter amount</Text>
              </View> */}
              <View style={styles.AvailableStaking}>
                <Text style={styles.bnbswap}>My Balance :</Text>
                <Text style={styles.bnbstaking}>{dcbalance}</Text>
              </View>
            </View>
            <View style={styles.StakingInputBox}>
              <TextInput
                placeholder="Enter amount you want to stake"
                placeholderTextColor="#B7B7B7"
                autoCorrect={true}
                autoCapitalize="none"
                style={styles.stakinginput}
                keyboardType="numeric"
                value={value}
                // onSubmitEditing={Keyboard.dismiss}

                onChangeText={text => setValue(text)}
              />
            </View>

            <View style={styles.stakingpro}>
              <View style={[styles.stakingvalew, styles.stakingtops]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => tanpercentage()}>
                  <Text
                    style={[
                      styles.staking101,
                      active == '10' && styles.active,
                    ]}>
                    10%
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.stakingvalew, styles.stakingtops]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => thirtypercentage()}>
                  <Text
                    style={[styles.staking10, active == '30' && styles.active]}>
                    30%
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.stakingvalew, styles.stakingtops]}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => max()}>
                  <Text
                    style={[
                      styles.staking10,
                      active == 'max' && styles.active,
                    ]}>
                    MAX
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: 15}}>
              <Text style={styles.StakingText}>
                Choose time period (day by)
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: '#fff',

                padding: 6,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#a3a3a3a8',
                marginTop: 5,
                marginBottom: 0,
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={selectedValues}
                style={{height: 40, color: '#fff'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValues(itemValue)
                }>
                <Picker.Item label={'1'} value="1" />
                <Picker.Item label={'10'} value="10" />
                <Picker.Item label={'20'} value="20" />
                <Picker.Item label={'30'} value="30" />
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

            {/* {isLoading && <AppLoder/>} */}
          </View>
          <View style={styles.swapbuttonConten}>
            <TouchableOpacity
              // disabled={true}
              activeOpacity={0.8}
              style={styles.swapButtonContainer}
              onPress={() => Stacking()}>
              <Text style={styles.swapButtonText}>Stake Now</Text>
            </TouchableOpacity>
          </View>
          </View>
          {stakes.length > 0 &&
            stakes.map((ele, idx) => (
              <View
                style={{
                  backgroundColor: '#0D6896',
                  borderColor: '#E6E2C3',
                  borderWidth: 1,
                  borderRadius: 15,
                  padding: 15,
                  marginVertical: 5,
                }}
                key={idx}>
                <View
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          lineHeight: 28,
                          fontWeight: '600',
                          fontSize: 15,
                        }}>
                        Invested Amount{' '}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: '#FFCC00', fontWeight: 'bold'}}>
                        {ele.investedAmount}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          lineHeight: 28,
                          fontWeight: '600',
                          fontSize: 15,
                        }}>
                        Reward{' '}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: '#FFCC00', fontWeight: 'bold'}}>
                        {ele.rewards}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#fff',
                          lineHeight: 28,
                          fontWeight: '600',
                          fontSize: 15,
                        }}>
                        Investment Date{' '}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: '#FFCC00', fontWeight: 'bold'}}>
                        {ele.time}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#fff',
                          lineHeight: 28,
                          fontWeight: '600',
                          fontSize: 15,
                        }}>
                        Withdraw Date{' '}
                      </Text>
                    </View>
                    <View>
                      <Text style={{color: '#FFCC00', fontWeight: 'bold'}}>
                        {ele.withdrawTime}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginVertical: 30,
                    // margin:100,
                    alignItems: 'center',
                  }}>
                  {ele.currentTime >= ele.withInSec ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        // #FFCC00
                        backgroundColor: '#FFCC00',
                        borderRadius: 28,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        width: '100%',
                        borderColor: '#0D6896',
                        borderWidth: 1,
                        // justifyContent: 'center',
                      }}
                      onPress={() => {
                        unStakeClick(ele.stakId, ele.userId);
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          marginBottom: 6,
                        }}>
                         Unstake
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        backgroundColor: '#ccc',
                        borderRadius: 28,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        width: '100%',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        // justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',

                          fontWeight: 'bold',
                          alignSelf: 'center',
                          marginBottom: 6,
                        }}>
                        Unstake
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
      {isLoading && <AppLoder />}
    </>
  );
};
export default Stacking;
