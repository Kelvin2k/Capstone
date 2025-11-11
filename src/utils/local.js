export const saveLocalStorage = (data, key) => {
    const dataJson = JSON.stringify(data)
    localStorage.setItem(key, dataJson)
}