import React, { useState } from 'react'
import { Text, View, Modal, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import data from '../../utils/db/path'

const PathModal = ({ modalPathActive, setModalPathActive }) => {
    const [valueA, setValueA] = useState('')
    const [valueB, setValueB] = useState('')
    const [focusA, setFocusA] = useState(false)
    const [focusB, setFocusB] = useState(false)

    let inputStyleA = focusA ? styles.inputFocus : styles.input;
    let inputStyleB = focusB ? styles.inputFocus : styles.input;

    let pathList = []

    for (let i in data) {
        pathList.push(...data[i])
    }

    const filtersPath = pathList.filter(i => i.toLowerCase().includes(valueA.toLowerCase()))

    return (
        <Modal visible={modalPathActive} transparent={true}>
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
                    padding: 20
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
                        }}>Построить маршрут</Text>

                        <Ionicons
                            name="ios-close-outline"
                            size={30}
                            color={'#2a3d77'}
                            onPress={() => setModalPathActive(false)}
                        />
                    </View>
                    
                    <View style={{
                        marginTop: 20,
                        marginBottom: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            marginRight: 16,
                            borderRadius: 50,
                            backgroundColor: '#2a3d77',
                            height: 34,
                            width: 34,
                            lineHeight: 29,
                            textAlign: 'center',
                            fontSize: 16,
                            color: '#fff',
                            borderWidth: 3,
                            borderColor: '#b9ccf3'
                        }}>А</Text>

                        <TextInput
                            placeholderTextColor='#585858'
                            placeholder='Откуда'
                            onChangeText={setValueA}
                            value={valueA}
                            onFocus={() => setFocusA(true)}
                            onBlur={() => setFocusA(false)}
                            style={{
                                height: 40,
                                backgroundColor: 'rgba(0,0,0,.05)',
                                color: '#585858',
                                borderRadius: 10,
                                paddingLeft: 16,
                                fontSize: 13,
                                flex: 1,
                                ...inputStyleA
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            marginRight: 16,
                            borderRadius: 50,
                            backgroundColor: '#2a3d77',
                            height: 34,
                            width: 34,
                            lineHeight: 29,
                            textAlign: 'center',
                            fontSize: 16,
                            color: '#fff',
                            borderWidth: 3,
                            borderColor: '#b9ccf3'
                        }}>Б</Text>

                        <TextInput
                            placeholderTextColor='#585858'
                            placeholder='Куда'
                            onChangeText={setValueB}
                            value={valueB}
                            onFocus={() => setFocusB(true)}
                            onBlur={() => setFocusB(false)}
                            style={{
                                height: 40,
                                backgroundColor: 'rgba(0,0,0,.05)',
                                color: '#585858',
                                borderRadius: 10,
                                paddingLeft: 16,
                                fontSize: 13,
                                flex: 1,
                                ...inputStyleB
                            }}
                        />
                    </View>


                    <ScrollView style={{
                        marginTop: 20
                    }}>

                        {filtersPath.length <= 0 && <View>
                            <Text style={{
                                fontSize: 15,
                                color: '#2a3d77',
                                fontWeight: 'bold'
                            }}>Ничего не найдено</Text>
                        </View>}

                        {filtersPath.length > 0 && filtersPath.map(i =>
                            <TouchableOpacity key={i} onPress={() => alert(i)}>
                                <View style={{
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#edeff3',
                                }}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#2a3d77',
                                        fontWeight: 'bold'
                                    }}>{i}</Text>
                                    <Text style={{
                                        fontSize: 11,
                                        color: '#666',
                                    }}>Аудитория</Text>
                                </View>

                            </TouchableOpacity>
                        )}

                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}

let styles = StyleSheet.create({
    input: {
        borderColor: '#eae9e5',
        borderWidth: 2,
        borderStyle: 'solid'
    },
    inputFocus: {
        borderColor: '#2a3d77',
        borderWidth: 2,
        borderStyle: 'solid'
    }
})

export default PathModal