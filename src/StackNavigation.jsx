import React, { useState } from 'react'
import { LogBox } from 'react-native'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Study from './components/screens/Study'
import Map from './components/screens/Map'
import Settings from './components/screens/Settings'
import Group from './components/screens/Group'
import Schedule from './components/screens/Schedule'
import { GroupProvider } from './hooks/useGroup'
import _ from './utils/_'

const Stack = createStackNavigator()

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

const StackNavigation = () => {
    const [group, setGroup] = useState()

    _.getLocalStorage('group', false)
        .then(e => setGroup(e))

    let initialRouteName = _.isString(group) && _.isset(group) ? 'Schedule' : 'Study'

    return (
        <NavigationContainer>
            <GroupProvider>
                <StatusBar />

                <Stack.Navigator
                    initialRouteName={initialRouteName}
                    screenOptions={{
                        headerShown: false,
                        tentStyle: {backgroundColor: '#f7f6f1'}
                    }}
                >

                    <Stack.Screen name='Study' component={Study} />
                    <Stack.Screen name='Map' component={Map} />
                    <Stack.Screen name='Settings' component={Settings} />
                    <Stack.Screen name='Group' component={Group} />
                    <Stack.Screen name='Schedule' component={Schedule} />

                </Stack.Navigator>
            </GroupProvider>
        </NavigationContainer>
    )
}

export default StackNavigation