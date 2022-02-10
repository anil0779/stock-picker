import { useCallback, useState } from "react";


const setterFn = (keyName, defaultValue) => {
    try {
        const value = window.localStorage.getItem(keyName);

        if (value) {
            return JSON.parse(value);
        } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
        }
    } catch (err) {
        return defaultValue;
    }
}


const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(setterFn.bind(null, keyName, defaultValue))

    const setValue = useCallback(newValue => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) { }
        setStoredValue(newValue);
    }, [keyName]);

    return [storedValue, setValue];
};

export default useLocalStorage;