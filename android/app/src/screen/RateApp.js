import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RateApp = () => {
  const [defaultRating, setdefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFillied = 'https://www.freeiconspng.com/img/613';
  const starImgCorner = 'https://www.freeiconspng.com/img/632';

  const CustomRatingBar = () => {
    return (
      <View
        style={{justifyContent: 'center', flexDirection: 'row', marginTop: 30}}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={item}
              onPress={() => setdefaultRating(item)}>
              <Image
                style={{width: 40, height: 40, resizeMode: 'cover'}}
                source={
                  item <= defaultRating
                    ? {uri: starImgFillied}
                    : {uri: starImgCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
      <View>
        <Text style={{color: '#000'}}>Rate our app</Text>
      </View>
      <View>
        <Text style={{color: '#000'}}>
          Yay! Mind Giving Us A 5 Star Rating On Play Store?
        </Text>
      </View>
      <View>
        <CustomRatingBar />
      </View>
      <Text
        style={{textAlign: 'center', fontSize: 23, margin: 20, color: '#000'}}>
        {defaultRating + ' / ' + maxRating.length}
      </Text>
      <TouchableOpacity
       activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: 30,
          padding: 15,
          backgroundColor: 'green',
        }}
        onPress={() => {
          alert(defaultRating);
        }}
        >
        <Text style={{color: '#000'}}>Sure! Let's Begin</Text>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignContent: 'center',paddingVertical:10}}>
        <TouchableOpacity
          activeOpacity={0.8}
         
        //   onPress={() => {
        //     alert(defaultRating);
        //   }}
          >
          <Text style={{color: '#000'}}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RateApp;
