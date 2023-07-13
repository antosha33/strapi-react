import { useCallback } from "react";

function useStorage() {

    const setData = useCallback((key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    },[])

    const getData = useCallback((key) => {
        return JSON.parse(localStorage.getItem(key))
    },[])

    return {
        setData,
        getData
    };
}

export default useStorage;