import React from "react";
import Select from 'react-select';
import { SelectBoxWrapper } from "../styledComponent";
import useSearch from "../hooks/useSearch.hook";

const SearchBox = () => {

    const {
        handleKeyPress,
        handleInputChange,
        handleSelection,
        options,
        selectedOption,
        loading
    } = useSearch();


    return (
        <SelectBoxWrapper>
            <Select
                onChange={handleSelection}
                onInputChange={handleInputChange}
                options={options}
                placeholder={`Search Stocks`}
                value={selectedOption}
                isLoading={loading}
                onKeyDown={handleKeyPress}
            />
        </SelectBoxWrapper>
    );
}

export default SearchBox;
