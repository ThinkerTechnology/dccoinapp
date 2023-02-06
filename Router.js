import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Login from './android/app/src/component/Login';
import Registration from './android/app/src/component/Registration';
import GeneralData from './android/app/src/screen/GeneralData';
import AddressBookData from './android/app/src/screen/AddressBookData';
import AccountDetailsData from './android/app/src/screen/AccountDetailsData';
import SecuirtyData from './android/app/src/screen/SecuirtyData';
import TabBar from './android/app/src/TabBar/TabBar';
import EnterPass from './android/app/src/component/EnterPass';
import Home from './android/app/src/screen/Home';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Aptos from './android/app/src/screen/Address_Book/Aptos';
import RegOtp from './android/app/src/component/RegOtp';
import DashboardTabs from './android/app/src/screen/DashboardTabScreen/DashboardTabs';
import Avalanche from './android/app/src/screen/Address_Book/Avalanche';
import Solana from './android/app/src/screen/Address_Book/Solana';
import Smart_chain from './android/app/src/screen/Address_Book/Smart_chain';
import Polygon from './android/app/src/screen/Address_Book/Polygon';
import Ethereum from './android/app/src/screen/Address_Book/Ethereum';
import Transfer from './android/app/src/screen/DashboardTabScreen/Transfer';
import Collecti from './android/app/src/screen/DashboardTabScreen/Collecti';
import AddToken from './android/app/src/screen/DashboardTabScreen/AddToken';
import Refcode from './android/app/src/component/Refcode';
import { enableScreens } from 'react-native-screens';
import FistScreen from './android/app/src/FlashScreen/FistScreen';
import EditUp from './android/app/src/screen/EditUp';
import secoondScreen from './android/app/src/FlashScreen/SecondScreen';
import secondScreen from './android/app/src/FlashScreen/SecondScreen';
import SecondScreen from './android/app/src/FlashScreen/SecondScreen';
import ThirdScreen from './android/app/src/FlashScreen/ThirdScreen';
import AddWallet from './android/app/src/screen/AddWallet';
import Support from './android/app/src/screen/Support';
import ShowNews from './android/app/src/screen/ShowNews';
import VerifyOTP from './android/app/src/component/VerifyOTP';
import KYC from './android/app/src/component/KYC';
import RegKyc from './android/app/src/component/RegKyc';
import FAQ from './android/app/src/screen/FAQ';
import AccordionItem from './android/app/src/screen/AccordionItem';
import RateApp from './android/app/src/screen/RateApp';
import SendToken from './android/app/src/screen/SendToken';
import Scanner from './android/app/src/screen/Scanner';
import Demoss from './android/app/src/screen/demo';
import Swap from './android/app/src/screen/Swap';
import Notification from './android/app/src/screen/Notification';
// import FistScreen from './android/app/src/FlashScreen/FistScreen';
// import Addtoken from './android/app/src/screen/DashboardTabScreen/SearchEdit/Addtoken';
enableScreens();
const Stack = createStackNavigator();

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    (async () => {
      setIsLoggedIn((await AsyncStorage.getItem('email')) ? true : false);
      await new Promise(resolve => setTimeout(resolve, 1000));
      SplashScreen.hide();
    })();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0D6896" barStyle="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isLoggedIn && (
          <>
          <Stack.Screen name="FistScreen" component={FistScreen} />
          <Stack.Screen name="SecondScreen" component={SecondScreen} />
          <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login">
              {props => <Login setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="EnterPass">
              {props => <EnterPass setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Registration">
              {props => <Registration {...props} />}
            </Stack.Screen>
            <Stack.Screen name="RegOtp">
              {props => <RegOtp setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Refcode">
              {props => <Refcode setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="KYC">
              {props => <KYC setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="RegKyc">
              {props => <RegKyc setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>

            {/* <Stack.Screen name="RateApp">
              {props => <RateApp setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen> */}
            {/* React Native Responsive Dimensions
          <Stack.Screen name="demo">
              {props => <Demoss setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen> */}

          {/* new degine  */}
            {/* <Stack.Screen name="FAQ">
              {props => <FAQ setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="AccordionItem">
              {props => <AccordionItem setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen> */}
          </>
        )}

        {isLoggedIn && (
          <>
            <Stack.Screen name="TabBar">
              {props => <TabBar setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="DashboardTabs">
              {props => (
                <DashboardTabs setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen name="GeneralData">
              {props => (
                <GeneralData setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AddressBookData">
              {props => (
                <AddressBookData setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen name="AccountDetailsData">
              {props => (
                <AccountDetailsData setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen name="SecuirtyData">
              {props => (
                <SecuirtyData setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>

            <Stack.Screen name="AddWallet">
              {props => (
                <AddWallet setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>

            <Stack.Screen name="Aptos">
              {props => <Aptos setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Avalanche">
              {props => <Avalanche setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Ethereum">
              {props => <Ethereum setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Polygon">
              {props => <Polygon setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Smart chain">
              {props => (
                <Smart_chain setIsLoggedIn={setIsLoggedIn} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Solana">
              {props => <Solana setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Transfer">
              {props => <Transfer setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Collecti">
              {props => <Collecti setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Addtoken">
              {props => <AddToken setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            {/* <Stack.Screen name="FistScreen">
              {props => <FistScreen setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen> */}
            <Stack.Screen name="EditUp">
              {props => <EditUp setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Support">
              {props => <Support setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="ShowNews">
              {props => <ShowNews setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="VerifyOTP">
              {props => <VerifyOTP setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="FAQ">
              {props => <FAQ setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="AccordionItem">
              {props => <AccordionItem setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="SendToken">
              {props => <SendToken setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Notification">
              {props => <Notification setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen>
            {/* <Stack.Screen name="Swap">
              {props => <Swap setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen> */}
            {/* <Stack.Screen name="Scanner">
              {props => <Scanner setIsLoggedIn={setIsLoggedIn} {...props} />}
            </Stack.Screen> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Router;
