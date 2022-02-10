import styled from "styled-components";

export const StyledDiv = styled.div`
    height: ${props => props.height || 'auto'};
    width: ${props => props.width || 'auto'};
    margin: ${props => props.margin || '0'};
    padding: ${props => props.padding || '0'};
    text-align: ${props => props.textAlign || 'initial'};
    background-color: ${props => props.bgColor || 'none'};
`;

export const FlexDiv = styled(StyledDiv)`
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    justify-content: ${props => props.justifyContent || 'center'};
    align-items: ${props => props.alignItems || 'center'};
`;

export const StockDataWrapper = styled(FlexDiv)`
    flex-wrap: wrap;
`;

export const StockDataTemplate = styled(FlexDiv)`
    width: 50%;
    padding: 1.2rem;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const Title = styled(StyledDiv)`
    font-weight: 500;
`

export const Info = styled(StyledDiv)`
    font-size: 13px;
`;

export const SelectBoxWrapper = styled(StyledDiv)`
    position: sticky;
    top:0;
    width:100%;
    text-align=-webkit-center;
    padding:1.2rem 24rem;
    background:cornflowerblue;

    @media screen and (max-width: 768px) {
        padding:1.2rem;
    }
`;

export const RefreshCTAWrapper = styled(FlexDiv)`
    background: lightgray;
    padding: 4px;
`

