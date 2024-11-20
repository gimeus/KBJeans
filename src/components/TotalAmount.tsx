import React from 'react';
import styled from 'styled-components';

interface TotalAmountProps {
  totalAmount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ totalAmount }) => {
  return (
    <TotalAmountWrapper>
      <TotalText>총 납입금액</TotalText>
      <AmountText>{totalAmount.toLocaleString()}원</AmountText>
      <HeartIcon src="/icons/lovemoney.svg" alt="Heart Icon" />
    </TotalAmountWrapper>
  );
};

export default TotalAmount;

const TotalAmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--g60);
  padding-top: 46px;
`;

const TotalText = styled.span`
  color: var(--g30);
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  line-height: 100%;
  margin-bottom: 8px;
`;

const AmountText = styled.span`
  color: var(--g20);
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  line-height: 100%;
  margin-bottom: 28px;
`;

const HeartIcon = styled.img`
  width: auto;
  height: auto;
`;
