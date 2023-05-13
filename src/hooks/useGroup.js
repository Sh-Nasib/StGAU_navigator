import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

import _ from '../utils/_'

const GroupContext = createContext({})

export const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState(null)
    const [isLoadingInitial, setIsLoadingInitial] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const deleteGroup = async () => {
        setIsLoading(true)
        try {
            _.deleteLocalStorage('group')
                .then(e => true)
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(
        () => {
            _.getLocalStorage('group', false)
                .then(data => {
                    if (_.isset(data) && _.isString(data)) {
                        setGroup({
                            name: data,
                            role: 'user',
                            schedule: {}
                        })
                    } else {
                        setGroup(null)
                    }
                })

            setIsLoadingInitial(false)
        },
        []
    )

    const values = useMemo(
        () => ({
            group,
            isLoading,
            delete: deleteGroup
        }),
        [group, isLoading])

    return (
        <GroupContext.Provider value={values}>
            {!isLoadingInitial && children}
        </GroupContext.Provider>
    )
}

export const useGroup = () => useContext(GroupContext)