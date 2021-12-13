export const imgImport = (folder,img) => {
    return require(`../assets/images/${folder}/${img}`).default
}
export const _url = 'https://smartg.a-lux.dev/'

export const _storage = {
    get : (key) => {
        return window.localStorage.getItem(key)
    },
    set: (key, value) => {
        return window.localStorage.setItem(key,value)
    },
    remove: (key,value) => {
        window.localStorage.removeItem(key);
        
    }
}