import React,{Component} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home"
import Details from "./screens/Details"
import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"


export default function App() {
  return( <AppContainer/> )
}

const appStackNavigator = createStackNavigator(
  {
  Home:{
    screen : Home,
    navigationOptions : {
      headerShown : false
  },

  },
  Details : {
    screen : Details
  }
},
  {
  initialRouteName : "Home"
  }
)

const AppContainer = createAppContainer(appStackNavigator)

