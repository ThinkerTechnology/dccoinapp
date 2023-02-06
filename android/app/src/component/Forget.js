import {View, Text, Pressable, Button} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Login from './Login';
const Forget = () => {
  const ForgetPass = async () => {
    alert('is Forget Password');
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
          <Text style={styles.text1}>Forget Password</Text>
          <Text style={styles.Text2}>
            No worries,well send you Forget instruction
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>New Password</Text>
          <View>
            <TextInput
              placeholder="Your Email"
              autoCapitalize="none"
              style={styles.input}
              // onChangeText={text => setEmail(text)}
            />
          </View>
          <Text style={styles.text}>Confirm Password</Text>
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
            <Button
              color="green"
              onPress={() => ForgetPass()}
              title="Forget Password"
            />
          </Pressable>
        </View>
        <Pressable>
          <Text style={styles.but} onPress={() => navigation.push('Login')}>
            Back to log in
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Forget;
