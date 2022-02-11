import React from "react";
import { StockDataTemplate, StockDataWrapper, Title, Info, FlexDiv } from "../styledComponent";
import Loader from './../components/Loader';
import RefreshCTA from './RefreshCTA';
import useStockDetailsFetcher from "../hooks/useStockDetailsFetcher.hook";

const StockOverView = () => {

    const { loading, dataFound, selectedStockDetails, selectedStockSymbol } = useStockDetailsFetcher();

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
                {selectedStockDetails.map(({ title, value }, index) => {
                    return (
                        <StockDataTemplate
                            key={index}
                        >
                            <Title >{title}</Title>
                            <Info >{value}</Info>
                        </StockDataTemplate>
                    )
                })}
            </StockDataWrapper>
        </>

    )
}


export default StockOverView;