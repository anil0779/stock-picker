import { useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';
import useLoader from './../hooks/useLoader.hook';
import { getStocksAutoSuggestions } from './../apis';


let searchDebounce = null;
// TODO : move to utils 
const getFormattedAutoSuggestion = (matches = []) => {
    return matches.map((match) => {
        // strange! Why api is not returning proper key-value pairs?!
        return { label: match[`1. symbol`], value: match[`2. name`] }
    });
};

const useSearch = () => {

    const [options, setOptions] = useState([]); // dynamic drop down values
    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, showLoader, hideLoader } = useLoader();

    const selectedStockSymbol = searchParams.get('search'); // extract stock symbol from url
    const selectedOption = selectedStockSymbol ?
        { value: selectedStockSymbol, label: selectedStockSymbol } : null;

    const handleInputChange = useCallback((_input = '') => {
        if (!_input) return;
        const input = _input.toUpperCase(); // Why ? will handle case sensitive cache search too
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
            showLoader();
            getStocksAutoSuggestions(input).then(({ data }) => {
                const newSuggestions = getFormattedAutoSuggestion(data.bestMatches)
                setOptions(newSuggestions);
            }).catch(() => {
                alert('Something wen wrong!')
            }).finally(() => {
                hideLoader();
            })
        }, 500)

    }, [hideLoader, showLoader]);

    const handleSelection = useCallback((selection) => {
        const { label = '' } = selection || {};
        setSearchParams({ search: label });
    }, [setSearchParams]);

    const handleKeyPress = useCallback((event) => {
        if (event.code === 'Enter' && event.target.value) {
            clearTimeout(searchDebounce);
            setSearchParams({ search: event.target.value })
        }
    }, [setSearchParams])

    return {
        handleKeyPress,
        handleInputChange,
        handleSelection,
        options,
        selectedOption,
        loading,
    }
};

export default useSearch;