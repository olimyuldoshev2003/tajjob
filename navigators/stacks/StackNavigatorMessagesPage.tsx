import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Messages from '@/screens/application/Message'

const StackNavigatorMessagesPage = () => {

    const Stack = createNativeStackNavigator()

  return (
      <Stack.Navigator
          screenOptions={{
          headerShown: false
      }}
      >
          <Stack.Screen name='Messages' component={Messages}/>
    </Stack.Navigator>
  )
}

export default StackNavigatorMessagesPage

const styles = StyleSheet.create({})