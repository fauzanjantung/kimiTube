import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Constant from 'expo-constants';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import VideoPlayer from './src/screens/VideoPlayer';
import Explore from './src/screens/Explore';
import Subscribe from './src/screens/Subscribe';
import {MaterialIcons} from '@expo/vector-icons';
import {Provider, useSelector} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer} from './src/reducer/reducer';
import {themeReducer} from './src/reducer/themeReducer';

const customDarkTheme = {
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor:"#404040",
    iconColor:"white",
    tabIcon:"white"
  }
}
const customDefaultTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    headerColor:"white",
    iconColor:"black",
    tabIcon:"red"
  }
}

const rootReducer = combineReducers({
  cardData:reducer, // []
  myDarkMode:themeReducer //false
})
const store = createStore(rootReducer)
const stack = createStackNavigator()
const tabs = createBottomTabNavigator()

const RootHome = () => {
  const {colors} = useTheme()
  return(
    <tabs.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Explore') {
          iconName = 'explore';
        } else if (route.name === 'Subscribe'){
          iconName = 'subscriptions';
        }

        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={25} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}>
      <tabs.Screen name="Home" component={Home}/>
      <tabs.Screen name="Explore" component={Explore}/>
      <tabs.Screen name="Subscribe" component={Subscribe}/>
    </tabs.Navigator>
  )
}

export default App = () => {
  return(
    <Provider store={store}>
    <Navigation />
  </Provider>
  )
}

export function Navigation() {
  let currentTheme  = useSelector(state=>{
    return state.myDarkMode
  })
  return (
    <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
      <stack.Navigator headerMode="none">
        <stack.Screen name="rootHome" component={RootHome}/>
        <stack.Screen name="search" component={Search}/>
        <stack.Screen name="videoPlayer" component={VideoPlayer}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}