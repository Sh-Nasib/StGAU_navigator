import * as SecureStore from 'expo-secure-store'

export default {
    getLocalStorage: async (key, defaultValue) => {
        const saved = await SecureStore.getItemAsync(key)
        const initial = !saved || saved === 'undefined' ? null : JSON.parse(saved);
        return initial || defaultValue;
    },

    deleteLocalStorage: async key => {
        return await SecureStore.deleteItemAsync(key)
    },

    isString: str => typeof(str) === 'string',

    isset: vars => ((typeof vars !== 'undefined' && vars !== null) || vars.trim() !== ''),

    empty: vars => (typeof vars === 'undefined') && (vars === null),

    type: obj => obj === null ? String(obj) : {}[toString.call(obj)] || 'object'
}