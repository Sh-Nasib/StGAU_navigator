import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { View, ImageBackground, ScrollView, TouchableOpacity, Text } from 'react-native'

import Layout from '../template/Layout'
import Header from '../template/Header'
import Footer from '../template/Footer'
import _ from '../../utils/_'

const Settings = ({ navigation }) => {
    const [group, setGroup] = useState()

    _.getLocalStorage('group', false)
        .then(e => {
            setGroup(e)
        })

    return (
        <Layout>
            <Header navigation={navigation} type={3} />
            
            <View style={{flex:1}}>
                <ImageBackground
                    source={require('../../../assets/img/bgmap.png')}
                    resizeMode='cover'
                    style={{flex:1}}
                >
                    <ScrollView style={{
                        padding: 30,
                    }}>
                        
                        <TouchableOpacity>
                            <View style={{
                                padding: 20,
                                alignItems: 'center',
                                backgroundColor: '#ece0b5b3',
                                borderRadius: 10,
                                marginBottom: 20
                            }}>
                                <AntDesign
                                    name="infocirlceo"
                                    size={24}
                                    color={'#67430c'}
                                />
                                <Text style={{
                                    marginTop: 6,
                                    fontSize: 15,
                                    color: '#67430c',
                                    
                                    fontWeight: 500
                                }}>О приложении</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View style={{
                                padding: 20,
                                alignItems: 'center',
                                backgroundColor: '#ece0b5b3',
                                borderRadius: 10,
                                marginBottom: 20
                            }}>
                                <Ionicons
                                    name="ios-chatbubble-ellipses-outline"
                                    size={24}
                                    color={'#67430c'}
                                />
                                <Text style={{
                                    marginTop: 6,
                                    fontSize: 15,
                                    color: '#67430c',
                                    
                                    fontWeight: 500
                                }}>Оставить отзыв</Text>
                            </View>
                        </TouchableOpacity>

                        {_.isString(group) && _.isset(group) ? (
                            <TouchableOpacity onPress={() => navigation.navigate('Group')}>
                                <View style={{
                                    padding: 20,
                                    alignItems: 'center',
                                    backgroundColor: '#ece0b5b3',
                                    borderRadius: 10,
                                }}>
                                    <AntDesign
                                        name="swap"
                                        size={24}
                                        color={'#67430c'}
                                    />
                                    <Text style={{
                                        marginTop: 6,
                                        fontSize: 15,
                                        color: '#67430c',

                                        fontWeight: 500
                                    }}>Сменить группу</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (<></>) }

                    </ScrollView>

                    <Footer name='Settings' navigation={navigation} />
                </ImageBackground>
            </View>
        </Layout>
    )
}

export default Settings
