function useStorage() {

    const setData = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }

    const getData = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    return {
        setData,
        getData
    };
}

export default useStorage;