import { View, Text, Image } from 'react-native'
import React from 'react'
import Headers from '../Header/Headera'
import { styles } from '../styles'
// import AddressData from './AddressData'

const AaddressBook = (props) => {
  const { navigation } = props
  return (
    <>
      <View style={{ flexDirection: 'column',
            display: 'flex',
            // alignItems: 'center',
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 10,
            marginBottom: 10,
            }}>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 10,
            marginBottom: 10,
          }}>
              <Image
            source={require('../image/Address.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'cover',
              borderRadius: 50,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <Text style={{marginLeft: 10, fontSize:14 ,color:'#000'}} onPress={() => navigation.push('AddressBookData')}>Aaddress Book</Text>
          </View>
        </View>
    </>
  )
}

export default AaddressBook