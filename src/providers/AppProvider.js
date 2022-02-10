import React, { useReducer } from "react";

const AppContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_STOCK_DETAILS':
            return {
                ...state,
                selectedStockDetails: action.value
            }
        case 'UPDATE_REFRESH_INTERVAL':
            return {
                ...state,
                refreshInterval: action.value
            }
        default:
            return state
    }
}

const AppProvider = ({ children }) => {

    const [appData, dispatch] = useReducer(reducer, {})

    return (
        <AppContext.Provider value={[appData, dispatch]}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }