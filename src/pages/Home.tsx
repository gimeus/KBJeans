import React from 'react';
import styled from 'styled-components';
import HeaderMain from '@/components/HeaderMain';
import StatusInfo from '@/components/StatusInfo';

const Home = () => {
  // 더미 데이터
  const badgeCount = 3;
  const subscriptionAmount = 150000;

  return (
    <Container>
      <HeaderMain />
      <StatusInfo
        badgeCount={badgeCount}
        subscriptionAmount={subscriptionAmount}
      />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
