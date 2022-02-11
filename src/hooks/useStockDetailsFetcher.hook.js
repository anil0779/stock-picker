import { useState, useEffect, useContext } from "react";
import { useSearchParams } from 'react-router-dom';
import { getStockOverview } from './../apis';
import useLoader from './../hooks/useLoader.hook';
import useLocalStorage from './../hooks/useLocalStorage.hook';
import { AppContext } from "../providers";

const displayLabels = {
    Symbol: 'Stock Symbol',
    Name: 'Stock Name',
    AnalystTargetPrice: 'Current Price',
    Exchange: 'Exchange',
    Industry: 'Industry',
    PERatio: 'PE Ratio',
    MarketCapitalization: 'Market Cap',
    Description: 'Description',
};


const useStockDetailsFetcher = () => {
    const { loading, showLoader, hideLoader } = useLoader();
    const [dataFound, setDataFound] = useState(false);
    const [appData, dipatch] = useContext(AppContext);
    const { selectedStockDetails } = appData;
    const [searchParams] = useSearchParams();
    const selectedStockSymbol = searchParams.get('search');
    const [cache, setCache] = useLocalStorage('stockOverview', {});

    useEffect(() => {
        if (selectedStockSymbol) {
            if (cache[selectedStockSymbol]) {
                setDataFound(true);
                dipatch({
                    type: 'UPDATE_STOCK_DETAILS',
                    value: cache[selectedStockSymbol]
                });
            } else {
                showLoader();
                // TODO : Should move to redux?! 
                getStockOverview(selectedStockSymbol).then(({ data }) => {
                    hideLoader();
                    const keys = Object.keys(displayLabels);
                    const values = keys.map((key) => {
                        return {
                            title: displayLabels[key],
                            value: data[key] || '-'
                        }
                    });

                    if (!data.Note && !data.Information && Object.keys(data).length > 0) {
                        setDataFound(true)
                        setCache({ ...cache, [selectedStockSymbol]: values })
                    } else {
                        setDataFound(false)
                    };
                    dipatch({
                        type: 'UPDATE_STOCK_DETAILS',
                        value: values
                    });
                }).catch(() => {
                    alert('Something wen wrong!')
                }).finally(() => {
                    hideLoader();
                })
            }
        }
    }, [dipatch, hideLoader, selectedStockSymbol, showLoader])

    return {
        loading,
        dataFound,
        selectedStockDetails,
        selectedStockSymbol
    }
};

export default useStockDetailsFetcher;