import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { StockDataTemplate, StockDataWrapper, Title, Info, FlexDiv } from "../styledComponent";
import { getStockOverview } from './../apis';
import useLoader from './../hooks/useLoader.hook';
import useLocalStorage from './../hooks/useLocalStorage.hook';
import Loader from './../components/Loader';
import { AppContext } from "../providers";
import RefreshCTA from './RefreshCTA';

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

const StockOverView = () => {

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

                    if (!data.Note && Object.keys(data).length > 0) {
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

    // TODO : move to seperate file
    const getStockDetails = useCallback(() => {
        return (
            selectedStockDetails.map(({ title, value }, index) => {
                return (
                    <StockDataTemplate
                        key={index}
                    >
                        <Title >{title}</Title>
                        <Info >{value}</Info>
                    </StockDataTemplate>
                )
            })
        )
    }, [selectedStockDetails])

    if (loading) {
        return <Loader />;
    }

    if (!selectedStockSymbol || !selectedStockDetails) {
        return <></>;
    }

    if (!dataFound) {
        return <FlexDiv>No Data Found</FlexDiv>
    }

    return (
        <>
            <RefreshCTA />
            <StockDataWrapper>
                {getStockDetails()}
            </StockDataWrapper>
        </>

    )
}


export default StockOverView;