import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import AccordionItem from './AccordionItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Divider } from 'react-native-paper';

const FAQ = () => {
  // const[shoeContent,setShowContent] = useState(false);
  const data = [
    {
      id: 0,
      title: 'Q.1 What is Do Coin Ecosystem?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 1,
      title: 'Q.2 How do i use a coupoan code?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 2,
      title: 'Q.3 What Choose this App?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 3,
      title: 'Q.4 What are the different App?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 4,
      title: 'Q.5 Why Choose this App?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 5,
      title: 'Q.6 Is therea list of judgments?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 6,
      title: 'Q.7 Why Choose this App?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      id: 7,
      title: 'Q.8 What it i can not find a App?',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
  ];
  return (
    <View style={{flex: 1, height: '100%', paddingHorizontal: 15}}>
      <View
        style={{
          borderRadius: 5,
          paddingTop: 50,
          paddingBottom: 10,
        }}>
        <Text style={{color: '#000', fontWeight: '800', fontSize: 18}}>
          Frequently Asked Questions
        </Text>
      </View>
      <View style={{paddingVertical:10}}>
        <Divider/>
      </View>
      <SafeAreaView
        style={{
          paddingVertical: 2,
          paddingHorizontal: 3,
          height: '100%',
        }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <AccordionItem
              key={item.id}
              title={item.title}
              bodyText={item.body}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default FAQ;
