import React, { useState } from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'

import GroupModal from '../modal/GroupModal'

const StudyItem = ({ navigation }) => {
    const [modalGroupActive, setModalGroupActive] = useState(false)
    
    return (
        <View style={{flex:1}}>

            <GroupModal
                modalGroupActive={modalGroupActive} setModalGroupActive={setModalGroupActive} navigation={navigation}
            />
            
            <ImageBackground
                source={require('../../../assets/img/bg.png')}
                resizeMode='cover'
                style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'}}
            >
                <Text style={{
                    color: '#67430c',
                    
                    fontSize: 13,
                    marginBottom: 3,
                    fontWeight: 'bold'
                }}>Добро пожаловать в приложение!</Text>
                <Text style={{
                    color: '#67430c',
                    
                    fontSize: 12,
                    marginBottom: 3,
                    fontWeight: 500
                }}>На данный момент мы не знаем вашу группу...</Text>

                <Pressable style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    elevation: 1,
                    backgroundColor: '#ece0b5',
                    marginTop: 16,
                    borderRadius: 10,
                }} onPress={() => navigation.navigate('Group')}>
                    <Text style={{
                        fontSize: 12,
                        lineHeight: 20,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        
                        color: '#67430c'
                    }}>Выбрать группу</Text>
                </Pressable>
            </ImageBackground>
        </View>
    )

}

export default StudyItem