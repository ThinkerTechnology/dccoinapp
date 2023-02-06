import {View, Text, Touchable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import socket from '../../../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Notification = () => {
  const isFocused = useIsFocused();
  const [data, setdata] = useState([]);

  const clearNotificaton =async () => {
    let email= await AsyncStorage.getItem('email');
    socket.emit('clearNotification', email);
  };
  const showNotification = async () => {
    let email= await AsyncStorage.getItem('email');
    // let email = 'nishantsharma39262@gmail.com';
    socket.emit('connected', email);

    socket.on('nofitications', function (data) {
      setdata(data);
    });
  };

  useEffect(() => {
    showNotification();
  }, [socket,isFocused]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 20,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 20,
            color: '#000',
            fontWeight: 'bold',
            marginBottom: 6,
          }}>
          Notification
        </Text>

        <TouchableOpacity
          onPress={() => clearNotificaton()}
          style={{
            backgroundColor: '#0D6896',
            borderRadius: 15,
            paddingVertical: 4,
            paddingHorizontal: 8,
            // marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              // fontWeight: 'bold',
              alignItems: 'center',
              marginBottom: 6,
              marginLeft: 5,
              textAlignVertical: 'top',
            }}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.length > 0 ? (
          data.map((ele, idx) => (
            <View style={{paddingVertical: 15}}>
              <View key={idx}
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
                  {ele.type}
                </Text>
                <Text
                  style={{color: '#5F6769', fontSize: 13, fontWeight: '600'}}>
                  {ele.date}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{color: '#5F6769', fontSize: 12, fontWeight: '400'}}>
                  {ele.address}
                </Text>
                {/* <Text style={{color: '#000', fontSize: 13, fontWeight: '400'}}>
                Date
              </Text> */}
              </View>
            </View>
          ))
        ) : (
          <View style={{justifyContent:'center',paddingVertical:10}}>
            <Text style={{color: '#000', fontWeight: 'bold'}}>No Notifications Found!</Text>
          </View>
        )}
      </ScrollView>

      {/* <View style={{paddingVertical: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Stack
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Time
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Address
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Date
          </Text>
        </View>
      </View>

      <View style={{paddingVertical: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Stack
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Time
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Address
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Date
          </Text>
        </View>
      </View>

      <View style={{paddingVertical: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Stack
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Time
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
            Address
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Date
          </Text>
        </View>
      </View>

      <View style={{paddingVertical: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Stack
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Time
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Address
          </Text>
          <Text style={{color: '#000', fontSize: 15, fontWeight: '600'}}>
            Date
          </Text>
        </View>
      </View>
       */}
    </View>
  );
};

export default Notification;
