import React, { useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Octicons, Feather } from '@expo/vector-icons'

import _ from '../../utils/_'

const StudyItem = () => {
    const [group, setGroup] = useState()

    _.getLocalStorage('group', false)
        .then(e => {
            setGroup(e)
        })

    const schedule = {
        days: [
            { id: 1, day: 'ПН', num: 14, active: true },
            { id: 2, day: 'ВТ', num: 15, active: false },
            { id: 3, day: 'СР', num: 16, active: false },
            { id: 4, day: 'ЧТ', num: 17, active: false },
            { id: 5, day: 'ПТ', num: 18, active: false },
            { id: 6, day: 'СБ', num: 19, active: false },
            { id: 7, day: 'ВС', num: 20, active: false }
        ],
        classes: [
            {
                id: 1, timeStart: '8:30', timeEnd: '10:05', name: 'пр. Проектная деятельность',
                teacher: 'Свистунова И.Г.', room: '179/ЭиФ', day: '13', active: false
            },
            {
                id: 2, timeStart: '10:15', timeEnd: '11:50', name: 'лаб Основы программирования в ИС',
                teacher: 'Гайчук Д.В.', room: '182/ЭиФ', day: '13', active: true
            },
            {
                id: 3, timeStart: '12:30', timeEnd: '14:05', name: 'лаб Базы данных',
                teacher: 'Кузьменко И.П.', room: '184/ЭиФ', day: '13', active: false
            },
            {
                id: 4, timeStart: '14:15', timeEnd: '15:50', name: 'лек Объектно-ориентированное программирование',
                teacher: 'Шматко С.Г.', room: '160/ЭиФ', day: '13', active: false
            },
            {
                id: 5, timeStart: '16:00', timeEnd: '17:35', name: 'лаб Управление жизненным циклом информационных систем',
                teacher: 'Шлаев Д.В.', room: '184/ЭиФ', day: '13', active: false
            }
        ]
    }

    return (
        <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 12}}>
            <View>
                <View style={{...styles.flexRow}}>
                    <Text style={{
                        color: '#67430c'
                    }}>Май, 2023</Text>
                    <Text style={{
                        color: '#67430c'
                    }}>1 неделя</Text>
                    <View style={{...styles.flexRow}}>
                        <TouchableOpacity>
                            <Octicons
                                name="chevron-left"
                                size={23}
                                color={'#888888'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft: 22}}>
                            <Octicons
                                name="chevron-right"
                                size={23}
                                color={'#67430c'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{...styles.flexRow, marginTop: 12}}>
                    {schedule.days.map(({ id, day, num, active }) => (
                        <TouchableOpacity key={id}>
                            <View style={active ? styles.blockDayActive : styles.blockDay}>
                                <Text style={active ? styles.textDayActive : styles.textDay}>{day}</Text>
                                <Text style={active ? styles.textDayNumActive : styles.textDayNum}>{num}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 12
                }}>
                    <View style={{width: 70, marginRight: 27}}>
                        <Text style={{...styles.textDay, textAlign: 'center'}}>Время</Text>
                    </View>
                    <View style={{
                        ...styles.flexRow,
                        flex: 1
                    }}>
                        <Text style={styles.textDay}>Занятие</Text>
                        <TouchableOpacity>
                            <Feather
                                name="sliders"
                                size={20}
                                color={'#888888'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 16}}>
                    {schedule.classes.map(({ id, timeStart, timeEnd, name, teacher, room, active }) => {
                        return (
                            <View key={id} style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{width: 70, position: 'relative'}}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 15,
                                        color: 'rgb(23, 44, 108)',
                                        fontWeight: 'bold',
                                        marginBottom: 2
                                    }}>{timeStart}</Text>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 12,
                                        color: '#888',
                                        fontWeight: 'bold'
                                    }}>{timeEnd}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    paddingLeft: 20,
                                    borderLeftWidth: 1,
                                    borderLeftColor: '#e3e3e3',
                                    position: 'relative',
                                    paddingBottom: 20,
                                    marginLeft: 7
                                }}>
                                    {active ? (
                                        <View style={{
                                            position: 'absolute',
                                            top: 4,
                                            left: -9,
                                            width: 16,
                                            height: 16,
                                            backgroundColor: 'rgb(23, 44, 108)',
                                            borderRadius: 50,
                                            borderWidth: 2,
                                            borderColor: '#b9ccf3'
                                        }}><Text></Text></View>
                                    ) : null}
                                    <Text style={{
                                        fontSize: 13,
                                        color: '#67430c',
                                        fontWeight: 'bold',
                                        lineHeight: 17
                                    }}>{name}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 3,
                                        marginBottom: 3
                                    }}>
                                        <Octicons
                                            name="person"
                                            size={16}
                                            color={'#888888'}
                                        />
                                        <Text style={{
                                            fontSize: 13,
                                            color: '#888',
                                            marginLeft: 7
                                        }}>{teacher}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Octicons
                                            name="location"
                                            size={16}
                                            color={'#888888'}
                                        />
                                        <Text style={{
                                            fontSize: 13,
                                            color: '#888',
                                            marginLeft: 5
                                        }}>{room}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockDay: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        borderRadius: 10,
    },
    blockDayActive: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        borderRadius: 10,
        backgroundColor: 'rgb(23, 44, 108)'
    },
    textDayActive: {
        fontSize: 12,
        color: '#fff'
    },
    textDayNumActive: {
        fontSize: 12,
        color: '#fff'
    },
    textDay: {
        fontSize: 13,
        color: '#888'
    },
    textDayNum: {
        fontSize: 13,
        color: '#67430c'
    }
})


export default StudyItem