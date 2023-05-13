import React from 'react'
import { SafeAreaView } from 'react-native'

const Layout = ({ children }) => {
    return (
        <SafeAreaView style={{
            backgroundColor: '#f7f6f1',
            flex: 1,
        }}>
            { children }
        </SafeAreaView>
    )
}

export default Layout