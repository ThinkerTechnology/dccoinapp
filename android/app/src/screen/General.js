import { View, Text, Image } from 'react-native'
import React from 'react'

const General = (props) => {
    const { navigation } = props
  return (
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
            source={require('../image/General.png')}
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
          <Text style={{marginLeft: 10, fontSize:15 ,color:'#000'}} onPress={() => navigation.push('GeneralData')} >General</Text>
          </View>
        </View>
  )
}

export default General