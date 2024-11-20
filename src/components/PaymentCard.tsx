import React from 'react';
import styled from 'styled-components';

interface PaymentCardProps {
  date: string;
  description: string;
  amount: number;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  date,
  description,
  amount,
}) => {
  return (
    <Card>
      <DateText>{date}</DateText>
      <DescriptionText>{description}</DescriptionText>
      <AmountText>{amount.toLocaleString()}원</AmountText>
    </Card>
  );
};

export default PaymentCard;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--g60);
  padding: 20px 16px;
  border-radius: 10px;
`;

const DateText = styled.span`
  flex: 1; /* 날짜 부분이 1 비율로 차지 */
  color: var(--g40);
  font-size: 15px;
  font-weight: 400;
  line-height: 100%;
`;

const DescriptionText = styled.span`
  flex: 2; /* 회차 부분이 2 비율로 차지 */
  color: var(--g10);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;

const AmountText = styled.span`
  flex: 1; /* 금액 부분이 1 비율로 차지 */
  color: var(--n10);
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
`;
