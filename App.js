import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styled from 'styled-components'
import SplashScreen from './Components/SplashScreen';
import HomeScreen from './Components/HomeScreen';
import Login from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Components/SignUp';
import { AuthProvider } from './AuthContext/AuthContext';
import Dashboard from './Components/Dashboard';
import SignUpUserType from './Components/SignUpUserType';
import SignUpUserCredentialsStudent from './Components/SignUpUserCredentialsStudent';
import QrScanner from './Components/QrScanner';
import ReportCovidCase from './Components/ReportCovidCase'
import ReportEmergency from './Components/ReportEmergency'
import ApiTester from './Components/ApiTester'
import SignUpUserCredentialsEmployee from './Components/SignUpUserCredentialsEmployee';
import SignUpUserCredentialsVisitor from './Components/SignUpUserCredentialsVisitor';
import DailyAsessment from './Components/DailyAsessment';
import SignStudPartTwo from './Components/SignStudPartTwo';
import SignStudPartThree from './Components/SignStudPartThree';
import SignEmpPartTwo from './Components/SignEmpPartTwo';
import SignEmpPartThree from './Components/SignEmpPartThree';
import RoomVisited from './Components/RoomVisited';
import SignVisPartTwo from './Components/SignVisPartTwo';
export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen options={{ headerShown: false }} name="SignVisPartTwo" component={SignVisPartTwo} />
          <Stack.Screen options={{ headerShown: false }} name="RoomVisited" component={RoomVisited} />
          <Stack.Screen options={{ headerShown: false }} name="SignEmpPartThree" component={SignEmpPartThree} />
          <Stack.Screen options={{ headerShown: false }} name="SignEmpPartTwo" component={SignEmpPartTwo} />
          <Stack.Screen options={{ headerShown: false }} name="SignStudPartThree" component={SignStudPartThree} />
          <Stack.Screen options={{ headerShown: false }} name="SignStudPartTwo" component={SignStudPartTwo} />
          <Stack.Screen options={{ headerShown: false }} name="DailyAsessment" component={DailyAsessment} />
          <Stack.Screen options={{ headerShown: false }} name="ReportEmergency" component={ReportEmergency} />
          <Stack.Screen options={{ headerShown: false }} name="ReportCovidCase" component={ReportCovidCase} />
          <Stack.Screen options={{ headerShown: false }} name="QrScanner" component={QrScanner} />
          <Stack.Screen options={{ headerShown: false }} name="SignUpUserCredentialsStudent" component={SignUpUserCredentialsStudent} />
          <Stack.Screen options={{ headerShown: false }} name="SignUpUserCredentialsEmployee" component={SignUpUserCredentialsEmployee} />
          <Stack.Screen options={{ headerShown: false }} name="SignUpUserCredentialsVisitor" component={SignUpUserCredentialsVisitor} />
          <Stack.Screen options={{ headerShown: false }} name="SignUpUserType" component={SignUpUserType} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
          <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

