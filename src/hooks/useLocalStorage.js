import React, { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

import _ from '../utils/_'

const useLocalStorage = (key, defaultValue) => {
    const [name, setName] = useState(() => {
        return _.getLocalStorage(key, defaultValue);
    })

    useEffect(() => {
        (async () => {
            await SecureStore.setItemAsync(key, JSON.stringify(name))
        })()
    }, [key, name])

    return [name, setName]
}

export default useLocalStorage