import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import {REACT_APP_BASEURL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShowNews = props => {
  const {route, navigation} = props;
  const {id} = route.params;
  const [result, setResult] = useState([]);

  const allNews = () => {
    if (id == undefined) return;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setResult([]);
    fetch(`${REACT_APP_BASEURL}fetchNews`, requestOptions)
      .then(response => response.json())
      .then(result => {
   
        let i = 0;
        while (i < result.result.length) {

          let image = `https://myreview.website/dcadmin_panel/${result.result[i].image}`;
          let title = result.result[i].title;
          let data = result.result[i].description;
          let name = result.result[i].category;

          let obj = {
            image,
            name,
            data,
            title,
          };

          setResult(prev => [...prev, obj]);
          i++;
        }
       
      })
      .catch(error => console.log('error', error));
  };

  const tagsStyles = {
    body: {
      color: '#000',
      fontSize: 18,
      flex: 1,
    },
    div: {
      color: '#000',
      textAlign: 'justify',
      justifyContent: 'flex-end',
      fontSize: 15,
      flex: 1,
      width: 380,
      //   flexDirection: 'row'
    },

    a: {
      color: '#000',
    },

    p: {
      // textAlign:'center',
      color: '#000',
      fontSize: 15,
    },
  };
  const {width} = useWindowDimensions();
  useEffect(() => {
    allNews();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              paddingHorizontal: 16,
              paddingVertical: 20,
              //   width:'100%',

              height: '100%',
            }}>
            <View>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 22}}>
                News
              </Text>
            </View>
          </View>
          <View>
            <Divider />
          </View>

          {result &&
            result.map((ele, idx) => (
              <View
                style={{paddingHorizontal: 16, paddingVertical: 20}}
                key={idx}>
                <View
                  style={{
                    borderRadius: 12,
                    // backgroundColor: '#151617',
                    width: '100%',
                    height: 200,
                  }}>
                  <ImageBackground
                    source={{uri: ele.image}}
                    style={{width: '100%', height: 200,borderRadius: 10,
                          overflow: 'hidden',}}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#000',
                      paddingTop: 10,
                      fontWeight: '600',
                    }}>
                    {ele.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#000',
                      fontWeight: 'bold',
                      paddingTop: 10,
                      // paddingBottom: 10,
                    }}>
                    {ele.title}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      color: 'black',
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: 12,
                    }}>
                    <RenderHtml
                      contentWidth={width}
                      source={{html: ele.data}}
                      tagsStyles={tagsStyles}
                    />
                  </View>
                </View>
              </View>
            ))}
          <View>
            <Divider />
          </View>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 30,
            }}>
            <View
              style={{
                margin: 5,
              }}>
              <Ionicons
                name="logo-instagram"
                size={30}
                color="#0D6896"
                // style={styles.iconsnews}
              />
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Ionicons
                name="logo-twitter"
                size={30}
                color="#0D6896"
                // style={styles.iconsnews}
              />
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Ionicons
                name="share-social-sharp"
                size={30}
                color="#0D6896"
                // style={styles.iconsnews}
              />
            </View>
          </View>

          <View style={{color: '#000'}}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ShowNews;
