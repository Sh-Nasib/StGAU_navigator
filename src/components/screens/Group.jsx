import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Layout from '../template/Layout'
import useLocalStorage from '../../hooks/useLocalStorage'
import _ from '../../utils/_'
import data from '../../utils/db/groups'

const Group = ({ navigation }) => {
    const [groupStorage, setGroupStorage] = useState()
    const [value, setValue] = useState('')
    const [focus, setFocus] = useState(false)

    _.getLocalStorage('group', false)
        .then(e => {
            setGroupStorage(e)
        })

    const [name, setName] = useLocalStorage('group',
        _.isString(groupStorage) && _.isset(groupStorage) ? groupStorage : ''
    )

    let inputStyle = focus ? styles.inputFocus : styles.input;

    let groupList = []

    for (let i in data) {
        groupList.push(...data[i])
    }

    const filtersGroup = groupList.filter(i => i.toLowerCase().includes(value.toLowerCase()))

    return (
        <Layout>
            <View style={{
                backgroundColor: '#f7f6f1',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                position: 'relative',
                padding: 16,
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
                        name="ios-arrow-back-outline"
                        size={30}
                        color={'#2a3d77'}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <View style={{
                    marginTop: 20,
                    marginBottom: 25,
                    backgroundColor: '#eae9e5',
                    height: 44,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...inputStyle
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
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
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
                        <TouchableOpacity key={i} onPress={() => {
                            setName(i)
                            navigation.navigate('Schedule')
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: '#2a3d77',
                                paddingBottom: 12,
                                marginBottom: 12,
                                borderBottomWidth: 1,
                                borderBottomColor: '#edeff3',
                            }}>{i}</Text>
                        </TouchableOpacity>
                    )}

                </ScrollView>

            </View>
        </Layout>
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

export default Group