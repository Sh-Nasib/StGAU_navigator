import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import PathModal from '../modal/PathModal'
import _ from '../../utils/_'

const Footer = ({ navigation, name }) => {
    const [modalPathActive, setModalPathActive] = useState(false)
    const [group, setGroup] = useState()

    _.getLocalStorage('group', false)
        .then(e => setGroup(e))

    return (
        <>
            <PathModal
                modalPathActive={modalPathActive} setModalPathActive={setModalPathActive}
            />
            
            <View style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: 6,
                paddingVertical: 16,
                margin: 12,
                borderRadius: 25,
                flexDirection: 'row',
                backgroundColor: '#ece0b5',
            }}>
                <TouchableOpacity onPress={() => navigation.navigate(initialRouteName)}>
                    <View style={styles.flex}>
                        <Ionicons
                            name="ios-document-text-outline"
                            size={20}
                            color={'#67430c'}
                        />
                        <Text style={name === 'Study' || 'Schedule' ? styles.textActive : styles.text}>Расписание</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <View style={styles.flex}>
                        <Ionicons
                            name="ios-map-outline"
                            size={20}
                            color={'#67430c'}
                        />
                        <Text style={name === 'Map' ? styles.textActive : styles.text}>Карта</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => name === 'Map' ? setModalPathActive(true) : navigation.navigate('Map')}>
                    <View style={styles.flex}>
                        <Ionicons
                            name="git-compare-outline"
                            size={20}
                            color={'#67430c'}
                        />
                        <Text style={styles.text}>Маршрут</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <View style={styles.flex}>
                        <Ionicons
                            name="ios-settings-outline"
                            size={20}
                            color={'#67430c'}
                        />
                        <Text style={name === 'Settings' ? styles.textActive : styles.text}>Настройки</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    flex: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    text: {
        color: '#67430c',
        fontSize: 11,
        marginTop: 3,
        
        fontWeight: 400
    },
    textActive: {
        color: '#67430c',
        
        fontSize: 11,
        marginTop: 3,
        fontWeight: 800
    }
})

export default Footer