import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, Text } from 'react-native';
import firebase from 'firebase'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxq2xtqDHyt_zefegkF97suz98Uzz91Ag",
  authDomain: "instagram-602db.firebaseapp.com",
  projectId: "instagram-602db",
  storageBucket: "instagram-602db.appspot.com",
  messagingSenderId: "525587530082",
  appId: "1:525587530082:web:22dba66ddc36bedbe02c3b",
  measurementId: "G-B01ZJNM27E"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add'

const Stack = createStackNavigator();



export class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    loaded: false,
  }
}

componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
    if(!user){
      this.setState({
        loggedIn: false,
        loaded: true,
      })
    } else {
      this.setState({
        loggedIn: true,
        loaded: true,
      })
    }
  })
}

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
        return(
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Loading</Text>
          </View>
        )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
              <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
        
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
         <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}} />
              <Stack.Screen name="Add" component={AddScreen}  />
            </Stack.Navigator>
            </NavigationContainer>
      </Provider>
      
      
    )
  }
}

export default App



