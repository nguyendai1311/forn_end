import styled from "styled-components";

export const WrapperLabelText = styled.h4`
  color: rgb(56, 56, 61);
  forn-size: 14px;
  forn-weight: 500;
`
export const WrapperTextValue = styled.span`
  color: rgb(56, 56, 61 );
  forn-size: 14px;
  forn-weight: 400;
`
export const WrapperContent = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
  gap: 12px;
`
export const WrapperTextPrice = styled.div`
  border-radius: 10px;
  background-color: rgb(238, 238, 238);
  color: rgb(56, 56, 61);
  padding: 4px;
  width: fit-content;
`

export const ProductCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #fff;
    max-width: 200px;

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
    }

    div {
        margin-top: 8px;
        font-size: 16px;
        font-weight: bold;
    }

    .price {
        color: #f40;
        margin-top: 4px;
        font-size: 14px;
    }
`;