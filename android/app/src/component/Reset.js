import { View, Text, Pressable, Button } from 'react-native'
import React from 'react'
import { styles } from '../styles'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

const Reset = () => {
    const ResetPass = async () => {
        alert("is Reset Password")
        // setIsLoading(true)
        // var formdata = new FormData();
  
        // // asyncStorage start setItem
        // AsyncStorage.setItem('email', email);
  
        // formdata.append('email', email);
        // formdata.append('password', password);
        // var requestOptions = {
        //     method: 'POST',
        //     body: formdata,
        //     redirect: 'follow'
        // };
  
        // fetch("", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         setIsLoading(false)
        //         if (result.code == 200) {
        //             props.setIsLoggedIn(true)
        //             navigation.push('Start');
        //         } else {
        //             console.log(result)
        //             Alert.alert('Login failed', result.messsage)
        //         }
        //     })
        //     .catch(error => {
  
        //         setIsLoading(false)
        //         console.log('error', error)
        //     });
    };
  return (
    <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 30,
            paddingHorizontal: 20,
          }}>
            <View style={styles.header}>
            <Text
              style={styles.text1}>
              Reset Password
            </Text>
            <Text style={styles.Text2}>
               Enter the Old Password associated With you account ,well send you Reset instruction
            </Text>
            </View>
            <View style={styles.footer}>
            <Text style={styles.text}>Old Password</Text>
            <View>
              <TextInput
                placeholder="Your Email"
                autoCapitalize="none"
                style={styles.input}
                // onChangeText={text => setEmail(text)}
              />
            </View>
            <Text style={styles.text}>New Password</Text>
            <View>
              <TextInput
                placeholder="Your Password"
                secureTextEntry={true}
                autoCapitalize="none"
                style={styles.input}
                // onChangeText={text => setPassword(text)}
              />
            </View>
            <Pressable style={styles.button}>
                <Button color="green" onPress={() => 
                ResetPass()
                } title="Reset Password" />
              </Pressable>
            </View>
            <Pressable>
            <Text style={styles.but}
             onPress={() => navigation.push('Login')}
             >
             Back to log in
            </Text>
          </Pressable>
          </ScrollView>
    </View>
  )
}

export default Reset