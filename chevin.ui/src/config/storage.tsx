
const LocalStorage = {
    getItemAsync: async (key: string) => {
        return window.localStorage.getItem(key) ?? '{}';
    },
    setItemAsync: async (key: string, value: string) => { window.localStorage.setItem(key, value) },
    deleteItemAsync: async (key: string) => { window.localStorage.removeItem(key) }
}


export {
    LocalStorage
}