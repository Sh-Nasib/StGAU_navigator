import React, { useState } from 'react'
import { Text, View, Modal, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import data  from '../../utils/db/groups.js'
import useLocalStorage from '../../hooks/useLocalStorage'

const GroupModal = ({ modalGroupActive, setModalGroupActive, navigation }) => {
    const [name, setName] = useLocalStorage('group', '')
    const [value, setValue] = useState('')

    let groupList = []

    for (let i in data) {
        groupList.push(...data[i])
    }

    const filtersGroup = groupList.filter(i => i.toLowerCase().includes(value.toLowerCase()))
    
    return (
        <Modal visible={modalGroupActive} transparent={true}>
            <View style={{
                position: 'relative',
                backgroundColor: '#00000075',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '100%',
                    height: '65%',
                    backgroundColor: '#f7f6f1',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'relative',
                    padding: 16
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            color: '#67430c',
                            
                            fontSize: 15,
                            fontWeight: 'bold'
                        }}>Выбрать группу</Text>

                        <Ionicons
                            name="ios-close-outline"
                            size={30}
                            color={'#2a3d77'}
                            onPress={() => setModalGroupActive(false)}
                        />
                    </View>

                    <View style={{
                        marginTop: 20,
                        marginBottom: 25,
                        backgroundColor: 'rgba(0,0,0,.05)',
                        height: 44,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Ionicons
                            name="search"
                            size={20}
                            color={'#67430c'}
                            style={{
                                marginLeft: 16
                            }}
                        />

                        <TextInput
                            placeholderTextColor='#585858'
                            placeholder='Найти свою группу'
                            onChangeText={setValue}
                            value={value}
                            style={{
                                backgroundColor: 'transparent',
                                marginLeft: 10,
                                width: '100%',
                                color: '#585858'
                            }}
                        />
                    </View>

                    <ScrollView>

                        {filtersGroup.length <= 0 && <View>
                            <Text style={{
                                fontSize: 15,
                                color: '#2a3d77',
                                fontWeight: 'bold'
                            }}>Ничего не найдено</Text>
                        </View>}

                        {filtersGroup.length > 0 && filtersGroup.map(i =>
                            <TouchableOpacity key={i} onPress={() => setName(i)}>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#2a3d77',
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#edeff3',
                                }}>{i}</Text>
                            </TouchableOpacity>
                        )}

                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}

export default GroupModal