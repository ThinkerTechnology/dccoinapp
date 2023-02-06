import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Linking,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../styles';
import Entypo from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {REACT_APP_BASEURL} from '@env';
import RenderHtml from 'react-native-render-html';
import {SafeAreaView} from 'react-native';
import AppLoder from '../Loder/AppLoder';
import socket from '../../../../socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const News = props => {
  const {navigation} = props;
  const isFocused = useIsFocused();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState([]);
  // const [selectedValue, setSelectedValue] = useState('ALL');
  const [select, setSelect] = useState([]);
  const fetchNews = async name => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      // category: 'Blockchain',
      category: name,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    setIsLoading(true);
    setResult([]);
    fetch(`${REACT_APP_BASEURL}news`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message !== 'No Data Found!') {
          let i = 0;
          while (i < result.result.length) {
            let image = `https://myreview.website/dcadmin_panel/${result.result[i].image}`;
            let Dates = new Date(Number(result.result[i].time) * 1000);
            let date =
              Dates.getDate() +
              '-' +
              Dates.getMonth() +
              1 +
              '' +
              '-' +
              Dates.getFullYear();
            let times = new Date(Number(result.result[i].time) * 1000);
            let time =
              times.getHours() +
              ':' +
              times.getMinutes() +
              ':' +
              times.getSeconds();
            let title = result.result[i].title;
            let data = result.result[i].description.substring(0, 200) + '...';
            let obj = {
              id: result.result[i].id,
              image,
              time,
              title,
              data,
              date,
            };

            setResult(prev => [...prev, obj]);
            i++;
            setIsLoading(false);
          }
        } else {
          // alert('NO Date Found !');
          setIsLoading(false);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const categoryData = () => {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setSelect([]);
    fetch(`${REACT_APP_BASEURL}categories`, requestOptions)
      .then(response => response.json())
      .then(result => {
        let i = 0;
        while (i < result.result.length) {
          let name = result.result[i].name;
          let obj = {
            id: result.result[i].id,
            name,
          };
          i++;

          setSelect(prev => [...prev, obj]);
        }
      })
      .catch(error => console.log('error', error));
  };

  const tagsStyles = {
    body: {
      // whiteSpace: 'normal',
      color: '#000000',
      fontSize: 15,
    },
    a: {
      color: '#000',
    },
    div: {
      color: '#000',
      textAlign: 'justify',
      justifyContent: 'flex-end',
      fontSize: 15,
    },
  };


  const {width} = useWindowDimensions();

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=com.portto.blocto&hl=en_IN&gl=US',
        url: 'https://play.google.com/store/apps/details?id=com.portto.blocto&hl=en_IN&gl=US',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const showNotification = async () => {
    let email = await AsyncStorage.getItem('email');
    // let email = 'nishantsharma39262@gmail.com';
    socket.emit('connected', email);

    socket.on('nofitications', function (data) {
      setdata(data);
      // let html = "";
      // data.map((ele)=>{
      //     html += `<li>${ele.type}</li>`;
      // })
      // document.getElementById("messages").innerHTML += html;
      // if(data.length == 0) document.getElementById("messages").innerHTML = `<li>No Data found</td></li>`;
    });
  };
  useEffect(() => {
    fetchNews();
    categoryData();
  }, [isFocused]);

  useEffect(() => {
    showNotification();
  }, [socket,isFocused]);
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff', height: '100%'}}>
        <ScrollView>
          <View style={styles.newscontainers}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#000',
                    fontWeight: 'bold',
                    marginBottom: 6,
                  }}>
                  News
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Notification');
                }}>
                <View
                  style={{
                    backgroundColor: '#0D6896',
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}>
                  <Icon name="bell" size={25} color="#fff" />
                  {data.length > 0 && (
                    <View
                      style={{
                        backgroundColor: 'red',
                        borderRadius: 30,
                        top: 0,
                        position: 'absolute',
                        right: -5,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: 10,
                          lineHeight: 16,
                        }}>
                        {data.length}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.NewsHAd}>
                <View style={{marginHorizontal: 1}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.newsButt,
                      // { backgroundColor: ButtonStateHolder ? '#607D8B' : '#009688' }
                    ]}
                    // style={[styles.ButtonStyle, { backgroundColor: this.state.ButtonStateHolder ? '#607D8B' : '#009688' }]}
                    onPress={() => {
                      fetchNews('All');
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: '400',
                        // fontWeight: 'bold',
                        // alignSelf: 'center',
                        // textTransform: 'uppercase',
                        marginBottom: 0,
                      }}>
                      All
                    </Text>
                  </TouchableOpacity>
                </View>

                {select &&
                  select.map((ele, idx) => (
                    <View style={{marginHorizontal: 1}} key={idx}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.newsButt,
                          // { backgroundColor: ButtonStateHolder ? '#607D8B' : '#009688' }
                        ]}
                        // style={[styles.ButtonStyle, { backgroundColor: this.state.ButtonStateHolder ? '#607D8B' : '#009688' }]}
                        onPress={() => {
                          fetchNews(ele.name);
                        }}
                        key={idx}>
                        <Text
                          key={idx}
                          style={{
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#fff',
                            // fontWeight: 'bold',
                            // alignSelf: 'center',
                            // textTransform: 'uppercase',
                            marginBottom: 0,
                          }}>
                          {ele.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </ScrollView>

            { result && result.length > 0 ? (
              result.map((ele, idx) => (
                <View style={{marginVertical: 10}} key={idx}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginBottom: 5,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onShare()}>
                        <Ionicons
                          name="share-social-sharp"
                          size={25}
                          color="#0D6896"
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={() => onShare()}>
                        <Ionicons
                          name="logo-twitter"
                          size={25}
                          color="#0D6896"
                          style={{marginLeft: 5, marginRight: 5}}
                        />
                      </TouchableOpacity> */}
                      {/* <TouchableOpacity onPress={() => onShare()}>
                        <Icon
                          name="telegram"
                          size={25}
                          color="#0D6896"
                          style={{marginLeft: 5, marginRight: 5}}
                        />
                      </TouchableOpacity> */}
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.push('ShowNews', {id: ele.id})}>
                    <View>
                      <ImageBackground
                        style={{
                          height: 250,
                          width: '100%',
                          borderRadius: 10,
                          overflow: 'hidden',
                        }}
                        source={{uri: ele.image}}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 8,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 4}}>
                          <Icon
                            name="calendar"
                            size={25}
                            color="#0D6896"
                            // style={styles.iconsnews}
                          />
                        </View>
                        <Text style={{color: '#0D6896', fontWeight: '600'}}>
                          {ele.date}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginRight: 4}}>
                          <Ionicons
                            name="ios-time-outline"
                            size={25}
                            color="#0D6896"
                            // style={styles.iconsnews}
                          />
                        </View>
                        <Text style={{color: '#0D6896', fontWeight: '600'}}>
                          {ele.time}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.Newspaper}>{ele.title}</Text>
                    </View>
                    <View>
                      <View style={styles.paperText}>
                        <RenderHtml
                          contentWidth={width}
                          source={{html: ele.data}}
                          tagsStyles={tagsStyles}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : !isLoading &&(
              <View>
                <Text style={{color: '#000', fontWeight: 'bold'}}>
                News Not Found !
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        {isLoading && <AppLoder />}
      </SafeAreaView>
    </>
  );
};

export default News;
