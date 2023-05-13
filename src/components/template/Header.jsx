import React, { useState } from 'react'
import { View, Image, Text } from 'react-native'

import _ from '../../utils/_'

const Header = ({ navigation, type }) => {
    const [group, setGroup] = useState()

    _.getLocalStorage('group', false)
        .then(e => setGroup(e))

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            backgroundColor: '#ece0b5',
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
        }}>
            <View>
                <Image
                    source={require('../../../assets/img/logo.png')}
                    resizeMode='cover'
                    style = {{ width: 50, height: 50 }}
                /> 
                
            </View>
            
            {type === 1 && <View style={{
                textAlign: 'right'
            }}>
                    <Text style={{
                        color: '#67430c',
                        
                        fontSize: 13,
                        marginBottom: 2,
                        fontWeight: 'bold',
                        textAlign: 'right'
                    }}>Расписание</Text>

                    {_.isString(group) && _.isset(group) ? (
                        <Text style={{
                            color: '#67430c',
                            fontSize: 11,
                            fontWeight: 500,
                            textAlign: 'right'
                        }}>{group}</Text>
                    ) : (
                        <Text style={{
                            color: '#67430c',
                            fontSize: 11,
                            fontWeight: 500,
                            textAlign: 'right'
                        }}>Выберите группу</Text>
                    )}
            </View>}

            {type === 2 && <View style={{
                textAlign: 'right'
            }}>
                <Text style={{
                    color: '#67430c',
                    
                    fontSize: 13,
                    marginBottom: 2,
                    fontWeight: 'bold',
                    textAlign: 'right'
                }}>Карта</Text>
                <Text style={{
                    color: '#67430c',
                    
                    fontSize: 11,
                    fontWeight: 500,
                    textAlign: 'right'
                }}>Экономический факультет</Text>
            </View>}

            {type === 3 && <View style={{
                textAlign: 'right'
            }}>
                <Text style={{
                    color: '#67430c',
                    
                    fontSize: 13,
                    marginBottom: 2,
                    fontWeight: 'bold',
                    textAlign: 'right'
                }}>Настройки</Text>
                <Text style={{
                    color: '#67430c',
                    
                    fontSize: 11,
                    fontWeight: 500,
                    textAlign: 'right'
                }}>stgau.navigator</Text>
            </View>}
        </View>
    )
}

export default Header