import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const badgeIcon = '/icons/badge.svg';
const walletIcon = '/icons/wallet.svg';

interface StatusInfoProps {
  badgeCount: number;
  subscriptionAmount: number;
}

const StatusInfo: React.FC<StatusInfoProps> = ({
  badgeCount,
  subscriptionAmount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/status-info');
  };

  return (
    <Container onClick={handleClick}>
      {' '}
      <Icon src={badgeIcon} alt="Badge Icon" />
      <Text>{badgeCount}개</Text>
      <Icon src={walletIcon} alt="Wallet Icon" />
      <Text>{subscriptionAmount.toLocaleString()}원</Text>
    </Container>
  );
};

export default StatusInfo;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: var(--g60);
  border-radius: 20px;
  padding: 0 18px;
  height: 40px;
  border-radius: 23px;
  border: 0.25px solid var(--n30);
  box-shadow: 0px 0px 4px 0px rgba(67, 115, 244, 0.1);
  cursor: pointer;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const Text = styled.span`
  color: var(--g20);
  font-size: 15px;
  font-weight: 500;
  line-height: 100%;
  margin-right: 18px;

  &:last-child {
    margin-right: 0;
  }
`;
