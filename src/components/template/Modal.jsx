import React from 'react'
import { View } from 'react-native'

const Modal = ({ active, setActive}) => {

    return (
        <View
            onClick={() => setActive(false)}
        >
            <View
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </View>
        </View>
    );

}

export default Modal