import React, { useCallback, useEffect, useState, useContext } from "react";
import { useSearchParams } from 'react-router-dom';
import { FlexDiv, StyledDiv, RefreshCTAWrapper } from "../styledComponent";
import { getStockOverview } from './../apis';
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

let intervalId = null;

const RefreshCTA = () => {

    const [searchParams] = useSearchParams();
    const selectedStockSymbol = searchParams.get('search');
    const [appData, dipatch] = useContext(AppContext);
    const { timeInterval } = appData;

    const handleInputChange = useCallback((val) => {
        const _timeInterval = val.target.value;
        dipatch({
            type: 'UPDATE_REFRESH_INTERVAL',
            value: _timeInterval
        });
        if (_timeInterval && Number(_timeInterval)) {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                getStockOverview(selectedStockSymbol).then(({ data }) => {
                    const keys = Object.keys(displayLabels);
                    const values = keys.map((key) => {
                        return {
                            title: displayLabels[key],
                            value: data[key] || '-'
                        }
                    });
                    dipatch({
                        type: 'UPDATE_STOCK_DETAILS',
                        value: values
                    });
                }).catch(() => {
                    alert('Something wen wrong!')
                })
            }, _timeInterval * 1000)
        } else {
            clearInterval(intervalId);
            dipatch({
                type: 'UPDATE_REFRESH_INTERVAL',
                value: 'none'
            });
        }
    }, [dipatch, selectedStockSymbol]);

    useEffect(() => {
        clearInterval(intervalId);
        return () => {
            clearInterval(intervalId);
            dipatch({
                type: 'UPDATE_REFRESH_INTERVAL',
                value: 'none'
            });
        }
    }, [dipatch, selectedStockSymbol])

    return (
        <RefreshCTAWrapper justifyContent='flex-end' padding='0 8px' >
            <StyledDiv padding='0 8px'>Refresh Interval</StyledDiv>
            <StyledDiv>
                <select value={timeInterval} onChange={handleInputChange}>
                    <option value="none">None</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </StyledDiv>
        </RefreshCTAWrapper>
    )
}

export default RefreshCTA;